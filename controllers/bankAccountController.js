const prisma = require('../prismaClient');
const { get } = require('../routes/userRoutes');

const createBankAccount = async (req,res) => {
    const { userId, bank_name, bank_account_number, balance } = req.body;
    try {
        const account = await prisma.bankAccounts.create({
            data: {
                userId,
                bank_name,
                bank_account_number,
                balance,
            },
        });
        res.status(201).json(account);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gagal membuat akun bank' });
    }
};

const getBankAccounts = async (req,res) => {
    try {
        const accounts = await prisma.bankAccounts.findMany();
        res.json(accounts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gagal menemukan akun bank' });
    }
};

const getBankAccountById = async (req,res) => {
    const { accountId } = req.params;
    try {
        const account = await prisma.bankAccounts.findUnique({
            where: { id: Number(accountId) },
        });
        if (account) {
            res.json(account);
        } else {
            res.status(404).json({ error: 'Akun bank tidak ditemukan' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gagal menemukan akun bank yang dicari' });
    }
};

module.exports = {
    createBankAccount,
    getBankAccounts,
    getBankAccountById,
};