const input = document.getElementById("input1");
const output = document.getElementById("output");

async function getDatabase() {
    let überschriftblock = document.createElement("tr");

    output.innerHTML = "";
    stringinput = String(input.value);

    if (stringinput == "users") {
        let überuser = document.createElement("th");
        überuser.innerHTML = "Username";
        let überid = document.createElement("th");
        überid.innerHTML = "ID";
        überschriftblock.appendChild(überid);
        überschriftblock.appendChild(überuser);
        output.appendChild(überschriftblock);
        let test = document.createElement("br");
        output.appendChild(test);

        const response = await fetch("http://localhost:3000/users");
        const dataUser = await response.json();
        let stringArr = JSON.stringify(dataUser).split(",");

        for (let i = 0; i < stringArr.length; i += 2) {
            let newtr = document.createElement("tr");
            let newth1 = document.createElement("th");
            let newth2 = document.createElement("th");

            let username = stringArr[i + 1];
            let id = stringArr[i];

            let textid = id.replace(/[["',}{]/g, "");
            let textid2 = textid.replace(/]/g, "");
            let textid3 = textid2.replace(/\bid:\b/g, "");

            let textusername = username.replace(/[["',}{]/g, "");
            let textusername2 = textusername.replace(/]/g, "");
            let textusername3 = textusername2.replace(/\busername:\b/g, "");

            newth1.innerHTML = textid3;
            newth2.innerHTML = textusername3;

            newtr.appendChild(newth1);
            newtr.appendChild(newth2);
            output.appendChild(newtr);
        }
    }

    if (stringinput == "playlists") {
        let übername = document.createElement("th");
        übername.innerHTML = "Name";
        let überuserid = document.createElement("th");
        überuserid.innerHTML = "UserID";
        let überid = document.createElement("th");
        überid.innerHTML = "ID";
        überschriftblock.appendChild(überid);
        überschriftblock.appendChild(übername);
        überschriftblock.appendChild(überuserid);
        output.appendChild(überschriftblock);
        let test = document.createElement("br");
        output.appendChild(test);

        const response = await fetch("http://localhost:3000/playlists");
        const dataPlay = await response.json();

        let stringArr = JSON.stringify(dataPlay).split(",");

        for (let i = 0; i < stringArr.length; i += 3) {
            let newtr = document.createElement("tr");
            let newth1 = document.createElement("th");
            let newth2 = document.createElement("th");
            let newth3 = document.createElement("th");

            let name = stringArr[i + 1];
            let id = stringArr[i];
            let userid = stringArr[i + 2];

            let textid = id.replace(/[["',}{]/g, "");
            let textid2 = textid.replace(/]/g, "");
            let textid3 = textid2.replace(/\bid:\b/g, "");

            let textname = name.replace(/[["',}{]/g, "");
            let textname2 = textname.replace(/]/g, "");
            let textname3 = textname2.replace(/\bname:\b/g, "");

            let textuserid = userid.replace(/[["',}{]/g, "");
            let textuserid2 = textuserid.replace(/]/g, "");
            let textuserid3 = textuserid2.replace(/\buserId:\b/g, "");

            newth1.innerHTML = textid3;
            newth2.innerHTML = textname3;
            newth3.innerHTML = textuserid3;

            newtr.appendChild(newth1);
            newtr.appendChild(newth2);
            newtr.appendChild(newth3);
            output.appendChild(newtr);
        }
    }

    if (stringinput == "songs") {
        let übertitle = document.createElement("th");
        übertitle.innerHTML = "Title";
        let überartist = document.createElement("th");
        überartist.innerHTML = "Artist";
        let überid = document.createElement("th");
        überid.innerHTML = "ID";
        let übergenre = document.createElement("th");
        übergenre.innerHTML = "Genre";

        überschriftblock.appendChild(überid);
        überschriftblock.appendChild(übertitle);
        überschriftblock.appendChild(überartist);
        überschriftblock.appendChild(übergenre);
        output.appendChild(überschriftblock);
        let test = document.createElement("br");
        output.appendChild(test);

        const response = await fetch("http://localhost:3000/songs");
        const dataSongs = await response.json();
        let stringArr = JSON.stringify(dataSongs).split(",");

        for (let i = 0; i < stringArr.length; i += 4) {
            let newtr = document.createElement("tr");
            let newth1 = document.createElement("th");
            let newth2 = document.createElement("th");
            let newth3 = document.createElement("th");
            let newth4 = document.createElement("th");

            let id = stringArr[i];
            let title = stringArr[i + 1];
            let artist = stringArr[i + 2];
            let genre = stringArr[i + 3];

            let textid = id.replace(/[["',}{]/g, "");
            let textid2 = textid.replace(/]/g, "");
            let textid3 = textid2.replace(/\bid:\b/g, "");

            let texttitle = title.replace(/[["',}{]/g, "");
            let texttitle2 = texttitle.replace(/]/g, "");
            let texttitle3 = texttitle2.replace(/\btitle:\b/g, "");

            let textartist = artist.replace(/[["',}{]/g, "");
            let textartist2 = textartist.replace(/]/g, "");
            let textartist3 = textartist2.replace(/\bartist:\b/g, "");

            let textgenre = genre.replace(/[["',}{]/g, "");
            let textgenre2 = textgenre.replace(/]/g, "");
            let textgenre3 = textgenre2.replace(/\bgenre:\b/g, "");

            newth1.innerHTML = textid3;
            newth2.innerHTML = texttitle3;
            newth3.innerHTML = textartist3;
            newth4.innerHTML = textgenre3;

            newtr.appendChild(newth1);
            newtr.appendChild(newth2);
            newtr.appendChild(newth3);
            newtr.appendChild(newth4);
            output.appendChild(newtr);
        }
    }
    input.value = "";
}
