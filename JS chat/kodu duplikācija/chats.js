const ATJAUNOT = 1000;


async function sutitZinu() {
  let zina = document.getElementById("zinasVieta").value;
  let lietotajvards = document.getElementById("lietotajvards").value;

  if (zina.trim() !== "") {
    document.getElementById("zinasVieta").value = "";

    try {
      const atbilde = await fetch('/sutit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"zina": zina, "user": lietotajvards})
      });

      console.log(await atbilde.json());
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  }
}


async function ieladetChatu() {
  const atbilde = await fetch('/lasit');
  const chataSaturs = await atbilde.json();
  raditChatu(chataSaturs);
  await new Promise(resolve => setTimeout(resolve, ATJAUNOT));
  await ieladetChatu();
}

async function banUser() {
    let usernameToBan = prompt("Enter the username to ban:");

    const atbilde = await fetch('/ban_user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "username": usernameToBan })
    });

    console.log(await atbilde.json());
}

function raditChatu(saturs) {
  let vieta = document.getElementById("chats");
  let jaunaRinda = "<br>";
  let chats = "";

  for (rinda of saturs) {
    if (rinda.includes("\\color-")) {
      let colorMatch = rinda.match(/\\color-(\w+)/);

      if (colorMatch) {
        let color = colorMatch[1];
        let message = rinda.replace(/\\color-\w+/, '');

        chats += `<span style="color: ${color};">${message}</span>${jaunaRinda}`;
      }
    } else if (rinda.includes("\\pink")) {
      chats += `<span style="color: pink;">${rinda.replace("\\pink", "")}</span>${jaunaRinda}`;
    } else {
      let splitMessage = rinda.split(" - ");
      let username = splitMessage[0];
      let message = splitMessage.slice(1).join(" - ");

      chats += `<strong>${username}</strong> - ${message}${jaunaRinda}`;
    }
  }

  vieta.innerHTML = chats;
}
