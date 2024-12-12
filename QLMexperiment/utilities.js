/*
For now this utilities file just contains the code from 
https://softdev.ppls.ed.ac.uk/online_experiments/06_data.html for saving data.
*/

// helps save_data to try again if data saving fails
async function fetch_with_retry(...args) {
    let count = 0;
    while(count < 3) {
        try {
        let response = await fetch(...args);
        if (response.status !== 200) {
            throw new Error("Didn't get 200 Success");
        }
        return response;
        } catch(error) {
        console.log(error);
        }
        count++;
        await new Promise(x => setTimeout(x, 250));
    }
    throw new Error("Too many retries");
}

// save some data (as text) to the filename given
async function save_data(name, data_in){
    var url = 'save_data.php';
    var data_to_send = {filename: name, filedata: data_in};
    await fetch_with_retry(url, {
        method: 'POST',
        body: JSON.stringify(data_to_send),
        headers: new Headers({
                'Content-Type': 'application/json'
        })
    });
}