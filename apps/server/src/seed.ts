import { DataSource } from 'typeorm';
import { Admin } from './entities/admin.entity';
import { SiteConfig } from './entities/siteConfig.entity';
import { Menu } from './entities/menu.entity';
import { Consultant, ConsultantStatus } from './entities/consultant.entity';
import { BoardConfig, BoardSkin } from './entities/boardConfig.entity';
import { config } from 'dotenv';
import { join } from 'path';

// Load env vars from .env.local or .env if present (Vercel uses env vars)
config({ path: join(__dirname, '../../../.env') }); // Adjust path if needed

const dataSource = new DataSource({
    type: 'postgres',
    url: process.env.POSTGRES_URL,
    ssl: { rejectUnauthorized: false }, // For Vercel Postgres
    entities: [join(__dirname, 'entities', '*.entity.{ts,js}')],
    synchronize: true, // Auto create tables for seeding
});

async function runSeed() {
    try {
        console.log('🌱 Connecting to Database...');
        await dataSource.initialize();
        console.log('✅ Connected.');

        // 1. SiteConfig
        console.log('Creating Site Config...');
        const siteConfigRepo = dataSource.getRepository(SiteConfig);
        const existingConfig = await siteConfigRepo.findOneBy({});
        if (!existingConfig) {
            await siteConfigRepo.save({
                siteName: 'Metis Consulting',
                footerInfo: 'COPYRIGHT (C) METIS CONSULTING. ALL RIGHTS RESERVED.',
                metaDescription: 'Professional Consulting & Digital Business Cards',
            });
        }

        // 2. Admin
        console.log('Creating Admin...');
        const adminRepo = dataSource.getRepository(Admin);
        const existingAdmin = await adminRepo.findOne({ where: { email: 'admin@metis.com' } });
        if (!existingAdmin) {
            // In production, hash password! This is for initial setup.
            await adminRepo.save({
                email: 'admin@metis.com',
                password: 'password123', // TODO: Hash using bcrypt
                nickname: 'SuperAdmin',
            });
        }

        // 3. Menu (Hierarchy)
        console.log('Creating Menus...');
        const menuRepo = dataSource.getRepository(Menu);
        if ((await menuRepo.count()) === 0) {
            const home = await menuRepo.save({ name: 'Home', link: '/', sortOrder: 1 });
            const about = await menuRepo.save({ name: 'About', link: '/about', sortOrder: 2 });
            await menuRepo.save({ name: 'History', link: '/about/history', parent: about, sortOrder: 1 });
            await menuRepo.save({ name: 'Vision', link: '/about/vision', parent: about, sortOrder: 2 });
            await menuRepo.save({ name: 'Consultants', link: '/consultants', sortOrder: 3 });
        }

        // 4. Consultant
        console.log('Creating Consultant...');
        const consultantRepo = dataSource.getRepository(Consultant);
        if ((await consultantRepo.count()) === 0) {
            await consultantRepo.save({
                name: 'John Doe',
                slug: 'john-doe',
                position: 'Senior Consultant',
                department: 'Strategy',
                email: 'john@metis.com',
                status: ConsultantStatus.ACTIVE,
                introduction: 'Expert in Business Strategy and Digital Transformation.',
            });
        }

        // 5. BoardConfig
        console.log('Creating Boards...');
        const boardRepo = dataSource.getRepository(BoardConfig);
        if ((await boardRepo.count()) === 0) {
            await boardRepo.save([
                { name: 'Notice', slug: 'notice', skin: BoardSkin.LIST, writePermission: 'ADMIN' },
                { name: 'Gallery', slug: 'gallery', skin: BoardSkin.GALLERY, writePermission: 'ADMIN' },
            ]);
        }

        console.log('✨ Seed Completed Successfully!');
    } catch (error) {
        console.error('❌ Seed Failed:', error);
    } finally {
        await dataSource.destroy();
    }
}

runSeed();
