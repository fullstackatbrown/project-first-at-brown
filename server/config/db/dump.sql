CREATE TABLE account
(
    account_id    SERIAL                  NOT NULL
        CONSTRAINT account_pk
            PRIMARY KEY,
    first_name    VARCHAR                 NOT NULL,
    last_name     VARCHAR                 NOT NULL,
    year          INTEGER                 NOT NULL,
    picture       VARCHAR,
    pronouns      VARCHAR,
    hometown      VARCHAR,
    bio           VARCHAR,
    token         VARCHAR UNIQUE          NOT NULL,
    email         VARCHAR UNIQUE          NOT NULL,
    created_at    TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE room
(
    room_id    SERIAL PRIMARY KEY,
    prompt     VARCHAR   NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE message
(
    message_id   SERIAL                  NOT NULL
        CONSTRAINT message_pk
            PRIMARY KEY,
    body         VARCHAR                 NOT NULL,
    sender_id    INTEGER                 NOT NULL
        CONSTRAINT sender_fk
            REFERENCES account,
    recipient_id INTEGER                 NOT NULL
        CONSTRAINT recipient_fk
            REFERENCES account,
    created_at   TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE prompt_response
(
    room_id    INTEGER   NOT NULL,
    account_id INTEGER   NOT NULL,
    body       VARCHAR   NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    PRIMARY KEY (room_id, account_id),
    CONSTRAINT fkey_room FOREIGN KEY (room_id) REFERENCES room (room_id),
    CONSTRAINT fkey_account FOREIGN KEY (account_id) REFERENCES account(account_id)
);

CREATE TABLE prompt_response_report
(
    prompt_response_room_id    INTEGER   NOT NULL,
    prompt_response_account_id INTEGER   NOT NULL,
    reporter_account_id        INTEGER   NOT NULL,
    PRIMARY KEY (prompt_response_room_id, prompt_response_account_id, reporter_account_id),
    CONSTRAINT fkey_prompt_response FOREIGN KEY (prompt_response_room_id, prompt_response_account_id) REFERENCES prompt_response(room_id, account_id),
    CONSTRAINT fkey_account FOREIGN KEY (reporter_account_id) REFERENCES account(account_id)
);