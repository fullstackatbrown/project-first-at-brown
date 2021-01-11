-- ADAM

CREATE TABLE room
(
    room_id    INTEGER PRIMARY KEY,
    prompt     VARCHAR   NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE prompt_response
(
    room_id    INTEGER   NOT NULL,
    account_id INTEGER   NOT NULL,
    body       VARCHAR   NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    PRIMARY KEY (room_id, account_id),
    CONSTRAINT fkey_room FOREIGN KEY (room_id) REFERENCES room (room_id)
    -- CONSTRAINT fkey_account FOREIGN KEY (account_id) REFERENCES account(account_id)
);

-- JASON

CREATE TABLE account
(
    account_id    INTEGER                 NOT NULL
        CONSTRAINT account_pk
            PRIMARY KEY,
    first_name    TEXT                    NOT NULL,
    last_name     TEXT                    NOT NULL,
    year          INTEGER                 NOT NULL,
    picture       TEXT,
    concentration TEXT,
    pronouns      TEXT,
    token         TEXT                    NOT NULL,
    email         TEXT                    NOT NULL,
    created_at    TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE
UNIQUE INDEX account_token_uindex
    ON account (token);

CREATE TABLE message
(
    message_id   INTEGER                 NOT NULL
        CONSTRAINT message_pk
            PRIMARY KEY,
    body         TEXT                    NOT NULL,
    sender_id    INTEGER                 NOT NULL
        CONSTRAINT sender_fk
            REFERENCES account,
    recipient_id INTEGER                 NOT NULL
        CONSTRAINT recipient_fk
            REFERENCES account,
    created_at   TIMESTAMP DEFAULT NOW() NOT NULL
);
