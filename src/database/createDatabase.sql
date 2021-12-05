CREATE TABLE "recommendations" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL UNIQUE,
	"youtube_link" TEXT NOT NULL UNIQUE,
	"score" int NOT NULL DEFAULT '0',
	CONSTRAINT "recommendations_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "recommendation_genres" (
	"recommendation_id" bigint NOT NULL,
	"genre_id" bigint NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "genres" (
	"id" serial NOT NULL,
	"name" serial NOT NULL UNIQUE,
	CONSTRAINT "genres_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "recommendation_genres" ADD CONSTRAINT "recommendation_genres_fk0" FOREIGN KEY ("recommendation_id") REFERENCES "recommendations"("id");
ALTER TABLE "recommendation_genres" ADD CONSTRAINT "recommendation_genres_fk1" FOREIGN KEY ("genre_id") REFERENCES "genres"("id");




