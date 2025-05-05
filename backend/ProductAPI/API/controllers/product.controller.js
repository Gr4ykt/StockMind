export const hello = async (req, res) => {
    res.status(200);
    res.json({"message":"Hello World from PRODUCTS API"});
};