import {MigrationInterface, QueryRunner} from 'typeorm';

export class StatesRefactoring1536144803266 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('clients', true, true);
        await queryRunner.dropColumn('states', 'clientID');
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
