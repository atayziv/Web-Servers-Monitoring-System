-- Table: public.requestdb

-- DROP TABLE IF EXISTS public.requestdb;

CREATE TABLE IF NOT EXISTS public.requestdb
(
    id integer NOT NULL DEFAULT nextval('requestdb_id_seq'::regclass),
    name character varying(255) COLLATE pg_catalog."default",
    status character varying(255) COLLATE pg_catalog."default",
    "time" timestamp with time zone,
    CONSTRAINT requestdb_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.requestdb
    OWNER to postgres;