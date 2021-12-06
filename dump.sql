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
-- Name: genres; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.genres (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.genres OWNER TO postgres;

--
-- Name: genres_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.genres_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.genres_id_seq OWNER TO postgres;

--
-- Name: genres_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.genres_id_seq OWNED BY public.genres.id;


--
-- Name: genres_name_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.genres_name_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.genres_name_seq OWNER TO postgres;

--
-- Name: genres_name_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.genres_name_seq OWNED BY public.genres.name;


--
-- Name: recommendation_genres; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.recommendation_genres (
    recommendation_id bigint NOT NULL,
    genre_id bigint NOT NULL
);


ALTER TABLE public.recommendation_genres OWNER TO postgres;

--
-- Name: recommendations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.recommendations (
    id integer NOT NULL,
    name text NOT NULL,
    youtube_link text NOT NULL,
    score integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.recommendations OWNER TO postgres;

--
-- Name: recommendations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.recommendations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.recommendations_id_seq OWNER TO postgres;

--
-- Name: recommendations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.recommendations_id_seq OWNED BY public.recommendations.id;


--
-- Name: genres id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genres ALTER COLUMN id SET DEFAULT nextval('public.genres_id_seq'::regclass);


--
-- Name: genres name; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genres ALTER COLUMN name SET DEFAULT nextval('public.genres_name_seq'::regclass);


--
-- Name: recommendations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recommendations ALTER COLUMN id SET DEFAULT nextval('public.recommendations_id_seq'::regclass);


--
-- Data for Name: genres; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.genres (id, name) FROM stdin;
\.


--
-- Data for Name: recommendation_genres; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.recommendation_genres (recommendation_id, genre_id) FROM stdin;
\.


--
-- Data for Name: recommendations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.recommendations (id, name, youtube_link, score) FROM stdin;
\.


--
-- Name: genres_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.genres_id_seq', 12, true);


--
-- Name: genres_name_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.genres_name_seq', 1, false);


--
-- Name: recommendations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.recommendations_id_seq', 56, true);


--
-- Name: genres genres_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genres
    ADD CONSTRAINT genres_name_key UNIQUE (name);


--
-- Name: genres genres_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genres
    ADD CONSTRAINT genres_pk PRIMARY KEY (id);


--
-- Name: recommendations recommendations_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recommendations
    ADD CONSTRAINT recommendations_name_key UNIQUE (name);


--
-- Name: recommendations recommendations_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recommendations
    ADD CONSTRAINT recommendations_pk PRIMARY KEY (id);


--
-- Name: recommendations recommendations_youtube_link_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recommendations
    ADD CONSTRAINT recommendations_youtube_link_key UNIQUE (youtube_link);


--
-- Name: recommendation_genres recommendation_genres_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recommendation_genres
    ADD CONSTRAINT recommendation_genres_fk0 FOREIGN KEY (recommendation_id) REFERENCES public.recommendations(id);


--
-- Name: recommendation_genres recommendation_genres_fk1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recommendation_genres
    ADD CONSTRAINT recommendation_genres_fk1 FOREIGN KEY (genre_id) REFERENCES public.genres(id);


--
-- PostgreSQL database dump complete
--

