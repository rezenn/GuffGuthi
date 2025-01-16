import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: 'postgres',
    password: 'admin123',
    host: 'localhost',
    port: 5432,
    database: 'GuffGuthi',
});

export default pool;
