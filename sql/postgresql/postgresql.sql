CREATE SEQUENCE ezcssesitestyle_s
    START 1
    INCREMENT 1
    MAXVALUE 9223372036854775807
    MINVALUE 1
    CACHE 1;

CREATE TABLE ezcssesitestyle (
  id integer DEFAULT nextval('ezcssesitestyle_s'::text) NOT NULL,
  name character varying(255) NOT NULL DEFAULT 'name',
  current_version integer DEFAULT 0 NOT NULL,
  selected smallint NOT NULL
);

ALTER TABLE ONLY ezcssesitestyle
    ADD CONSTRAINT ezcssesitestyle_pkey PRIMARY KEY (id);

CREATE SEQUENCE ezcssesitestyle_definition_s
    START 1
    INCREMENT 1
    MAXVALUE 9223372036854775807
    MINVALUE 1
    CACHE 1;

CREATE TABLE ezcssesitestyle_definition (
  id integer DEFAULT nextval('ezcssesitestyle_definition_s'::text) NOT NULL,
  sitestyle_id integer DEFAULT 0 NOT NULL,
  style text NOT NULL,
  version integer DEFAULT 0 NOT NULL
);

ALTER TABLE ONLY ezcssesitestyle_definition
    ADD CONSTRAINT ezcssesitestyle_definition_pkey PRIMARY KEY (id);

CREATE SEQUENCE ezcssesitestyle_version_s
    START 1
    INCREMENT 1
    MAXVALUE 9223372036854775807
    MINVALUE 1
    CACHE 1;

CREATE TABLE ezcssesitestyle_version (
  id integer DEFAULT nextval('ezcssesitestyle_version_s'::text) NOT NULL,
  version integer DEFAULT 0 NOT NULL,
  sitestyle_id integer DEFAULT 0 NOT NULL,
  created integer DEFAULT 0 NOT NULL,
  modified integer DEFAULT 0 NOT NULL
);

ALTER TABLE ONLY ezcssesitestyle_version
    ADD CONSTRAINT ezcssesitestyle_version_pkey PRIMARY KEY (id);