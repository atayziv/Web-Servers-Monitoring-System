-- Table: public.webservers

-- DROP TABLE IF EXISTS public.webservers;

CREATE TABLE IF NOT EXISTS public.webservers
(
    id integer NOT NULL DEFAULT nextval('webservers_id_seq'::regclass),
    name character varying(255) COLLATE pg_catalog."default",
    url character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT webservers_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.webservers
    OWNER to postgres;