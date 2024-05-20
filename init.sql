DROP TABLE IF EXISTS properties;
DROP TABLE IF EXISTS users;

-- users table

CREATE TABLE users(
    id TEXT PRIMARY KEY,
    username TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    phone_num TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'user',
    verified BOOLEAN NOT NULL DEFAULT false,
    blocked BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

INSERT INTO users VALUES
('1', 'admin', 'ad', 'min', 'admin@admin.admin', '<>', '11223344', 'admin', true),
('2', 'aa', 'a', 'a', 'a@a.a', '<>', '77889955', 'user', true),
('3', 'bb', 'b', 'b', 'b@b.b', '<>', '66445522', 'user', true),
('4', 'cc', 'c', 'c', 'c@c.c', '<>', '33221144', 'user', true);

-- properties table

CREATE TABLE properties(
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    place TEXT NOT NULL,
    lon TEXT NOT NULL,
    lat TEXT NOT NULL,
    price_per_night REAL NOT NULL,
    user_id TEXT NOT NULL,
    blocked BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT users_properties_fk
        FOREIGN KEY(user_id)
        REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO properties VALUES (
    '1',
    'Modern flat in central Copenhagen w. 2 balconies',
    'Amagergade 21, Copenhagen denmark',
    '12.5697339',
    '55.6753132',
    1258,
    '2'
);

CREATE TABLE verification_codes(
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT users_verification_codes_fk
        FOREIGN KEY(user_id)
        REFERENCES users(id) ON DELETE CASCADE
);

-- updated_at trigger

CREATE OR REPLACE FUNCTION update_updated_at()
    RETURNS TRIGGER
    LANGUAGE PLPGSQL
AS
$$
BEGIN
    NEW.updated_at := CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trigger_update_users_updated_at ON users;
CREATE TRIGGER trigger_update_users_updated_at
    AFTER UPDATE
    ON users
    FOR EACH ROW
EXECUTE PROCEDURE update_updated_at();

DROP TRIGGER IF EXISTS trigger_update_properties_updated_at ON properties;
CREATE TRIGGER trigger_update_properties_updated_at
    AFTER UPDATE
    ON properties
    FOR EACH ROW
EXECUTE PROCEDURE update_updated_at();

-- delete properties on user soft deleted trigger

CREATE OR REPLACE FUNCTION delete_user_properties()
    RETURNS TRIGGER
    LANGUAGE PLPGSQL
AS
$$
BEGIN
    IF OLD.deleted_at IS NULL AND NEW.deleted_at IS NOT NULL THEN
        DELETE FROM properties
        WHERE user_id = NEW.id;
    END IF;
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trigger_on_user_deleted ON users;
CREATE TRIGGER trigger_on_user_deleted
    AFTER UPDATE
    ON users
    FOR EACH ROW
EXECUTE PROCEDURE delete_user_properties();
