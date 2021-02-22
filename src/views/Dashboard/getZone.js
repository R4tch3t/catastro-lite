import ip from "variables/ip.js";
export default async(street, barr, c) => {
    try {

        const sendUri = ip('3020')+"getZone";
        const bodyJSON = {
            street: street,
            barr: barr
        }
        const response = await fetch(sendUri, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyJSON)
        });

        const responseJson = await response.json().then(r => {

            if (r.zona !== undefined) {
                c.saveZ = 0
                c.setState({zona: r.zona[0].valor})
            }else{
                c.saveZ = 1
                c.setState({zona: 0})
            }
        });
    } catch (e) {
        console.log(`Error: ${e}`);
    }
}