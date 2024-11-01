const prisma = require('../prismaClient');

const createTransaction = async (req,res) => {
    const { source_account_id, destination_account_id, amount } = req.body;
    try {
        const transaction = await prisma.transactions.create({
            data: {
                source_account_id,
                destination_account_id,
                amount,
            },
            include: {
                sourceAccount: true,
                destinationAccount: true,
            },
        });
        res.status(201).json(transaction);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gagal membuat transaksi' });
    }
};

const getTransactions = async (req,res) => {
    try{
        const transactions = await prisma.transactions.findMany({
            include: {
                sourceAccount: true,
                destinationAccount: true,
            },
        });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: 'Gagal memuat transaksi' });
    }
};

const getTransactionById = async (req,res) => {
    const { transactionId } = req.params;
    try {
        const transaction = await prisma.transactions.findUnique({
            where: { id: Number(transactionId) },
            include: {
                sourceAccount: true,
                destinationAccount: true,
            },
        });
        if (transaction) {
            res.json(transaction);
        }else {
            res.status(404).json({ error: 'Transaksi tidak ditemukan' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gagal memuat transaksi' });
    }
};

module.exports = {
    createTransaction,
    getTransactions,
    getTransactionById,
};