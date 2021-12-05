--
-- PostgreSQL database dump
--

-- Dumped from database version 12.9 (Ubuntu 12.9-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.9 (Ubuntu 12.9-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: teste; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.teste (
    id integer NOT NULL
);


ALTER TABLE public.teste OWNER TO postgres;

--
-- Name: teste_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.teste_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.teste_id_seq OWNER TO postgres;

--
-- Name: teste_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.teste_id_seq OWNED BY public.teste.id;


--
-- Name: teste id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teste ALTER COLUMN id SET DEFAULT nextval('public.teste_id_seq'::regclass);


--
-- Data for Name: teste; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.teste (id) FROM stdin;
\.


--
-- Name: teste_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.teste_id_seq', 2, true);


--
-- Name: teste teste_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teste
    ADD CONSTRAINT teste_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--
