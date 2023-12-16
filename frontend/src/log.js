async function log(err) {
    try {
        const response = await axios.post('http://localhost:5000/api/logs', err);
        if (response.data.message) {
            alert(response.data.message);
        }
    } catch(err) {
        console.log(err);
    }
}

export default log;