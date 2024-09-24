import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1727024117376 implements MigrationInterface {
    name = 'Migration1727024117376'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "role" integer NOT NULL, CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Tasks" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "order" integer NOT NULL, "columnId" integer, CONSTRAINT "PK_f38c2a61ff630a16afca4dac442" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "TaskColumns" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "order" integer NOT NULL, "projectId" integer, CONSTRAINT "PK_4e72971f342c9e5dc37db9be998" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Projects" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_b25c37f2cdf0161b4f10ed3121c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Tasks" ADD CONSTRAINT "FK_150fedd2a3f5f9a9ad2b4612387" FOREIGN KEY ("columnId") REFERENCES "TaskColumns"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "TaskColumns" ADD CONSTRAINT "FK_5ffe8240bd14b6f0278ff991b1b" FOREIGN KEY ("projectId") REFERENCES "Projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TaskColumns" DROP CONSTRAINT "FK_5ffe8240bd14b6f0278ff991b1b"`);
        await queryRunner.query(`ALTER TABLE "Tasks" DROP CONSTRAINT "FK_150fedd2a3f5f9a9ad2b4612387"`);
        await queryRunner.query(`DROP TABLE "Projects"`);
        await queryRunner.query(`DROP TABLE "TaskColumns"`);
        await queryRunner.query(`DROP TABLE "Tasks"`);
        await queryRunner.query(`DROP TABLE "Users"`);
    }

}
