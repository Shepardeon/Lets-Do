import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1727026229139 implements MigrationInterface {
    name = 'Migration1727026229139'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Projects" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "Projects" ADD CONSTRAINT "FK_828856727aa053c3e37f698caa9" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Projects" DROP CONSTRAINT "FK_828856727aa053c3e37f698caa9"`);
        await queryRunner.query(`ALTER TABLE "Projects" DROP COLUMN "userId"`);
    }

}
