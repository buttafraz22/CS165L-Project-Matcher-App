import axios from "axios";

async function log(error) {
    try {
        console.log(error);
        const response = await axios.post('http://localhost:5000/api/logs', error);
        if (response.data.message) {
            alert(response.data.message);
        }
    } catch(err) {
        console.log(err);
    }
}

// const stackMatch = error.stack.match(/at\s.*\((.*):(\d+):(\d+)\)/);

// if (stackMatch) {
//     const [, fileName, rowNumber, columnNumber] = stackMatch;
//     alert(parseInt(columnNumber, 10));
//     alert(parseInt(rowNumber, 10));

//     // Send the error information to the server
//     try {
//         const serverResponse = await axios.post('http://your-server-url/log-error', {
//             errorMessage: error.message,
//             stackTrace: error.stack,
//             fileName,
//             rowNum: parseInt(rowNumber, 10),
//             columnNum: parseInt(columnNumber, 10),
//         });
//         console.log('Error sent to server:', serverResponse.data);
//     } catch (serverError) {
//         console.error('Failed to send error to server:', serverError.message);
//     }
// } else {
//     console.error('Unable to extract file, row, and column information from stack trace.');
// }

export default log;