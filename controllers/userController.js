const prisma = require('../prismaClient');

//Create atau POST
const createUser = async (req, res) => {
    const { name, email, password, profile } = req.body;
    
    try {
        const newUser = await prisma.users.create({
            data: {
                name,
                email,
                password,
                profile: { 
                    create: {
                        identity_type: profile.identity_type,
                        identity_number: profile.identity_number,
                        address: profile.address,
                    },
                },
            },
            include: { profile: true },
        });
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gagal membuat user dan profile', detail: error.message });
    }
};


// Read atau GET
const getUsers = async (req, res) => {
    try {
        const users = await prisma.users.findMany({
            include: { profile: true }
        });
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gagal mencari user', detail: error.message });
    }
};

const getUserById = async (req,res) => {
    const { userId } = req.params;
    try {
        const users = await prisma.users.findUnique({
            where: { id: Number(userId) },
            include: { profile: true },
        });
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gagal mencari user yang anda cari' });
    }
};

// UPDATE atau PUT
const updateUser = async (req, res) => {
    const { userId } = req.params;
    const { name, email, password, profile } = req.body;

    try {
        const updatedUser = await prisma.users.update({
            where: { id: Number(userId) },
            data: {
                name,
                email,
                password,
                profile: {
                    update: {
                        identity_type: profile.identity_type,
                        identity_number: profile.identity_number,
                        address: profile.address,
                    },
                },
            },
            include: { profile: true },
        });
        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gagal mengupdate user dan profile', detail: error.message });
    }
};

// DELETE
const deleteUser = async (req, res) => {
    const { userId } = req.params;

    try {
        // Hapus user dan profile terkait (karena relasi Cascade di Prisma)
        await prisma.users.delete({
            where: { id: Number(userId) },
        });
        res.json({ message: 'User berhasil dihapus' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gagal menghapus user', detail: error.message });
    }
};


module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
};