import "./styles.css";

let users = [];

document.readyState === "loading"
  ? document.addEventListener("DOMContentLoaded", initializeCode)
  : initializeCode();

function initializeCode() {
  addUser("Hackerman", "hackerman@hacker.man", "Leet Street 1337", true);
  addUser("Plebman", "pleb.man@example.com", "Asdf Avenue 22", false);
  addUser("Plebwoman", "pleb.woman@example.com", "Rand Road 45", false);

  const usernameInput = document.getElementById("input-username");
  const emailInput = document.getElementById("input-email");
  const addressInput = document.getElementById("input-address");
  const adminInput = document.getElementById("input-admin");
  const imageInput = document.getElementById("input-image");

  const addUserButton = document.getElementById("submit-data");
  addUserButton.addEventListener("click", () =>
    addUser(
      usernameInput.value,
      emailInput.value,
      addressInput.value,
      adminInput.checked,
      imageInput.files[0] || null
    )
  );

  const emptyButton = document.getElementById("empty-table");
  emptyButton.addEventListener("click", () => {
    users = [];
    drawUsersTable();
  });
}

function addUser(username, email, address, admin, image) {
  let index = users.findIndex((user) => user.username === username);
  if (index === -1) {
    users.push({
      username: username,
      email: email,
      address: address,
      admin: admin,
      image: image
    });
  } else {
    users[index] = { username, email, address, admin, image };
  }
  drawUsersTable();
}

function drawUsersTable() {
  const usersTable = document.getElementById("users-table");
  usersTable.innerHTML =
    "<tr><td>Username</td><td>Email</td><td>Address</td><td>Admin</td><td>Image</td></tr>";
  users.forEach(({ username, email, address, admin, image }) => {
    let newTr = document.createElement("tr");

    [username, email, address].forEach((data) => {
      let newTd = document.createElement("td");
      newTd.innerText = data;
      newTr.appendChild(newTd);
    });

    let adminTd = document.createElement("td");
    adminTd.innerText = admin ? "X" : "-";
    newTr.appendChild(adminTd);

    let imageTd = document.createElement("td");
    if (image) {
      let imageEl = document.createElement("img");
      imageEl.src = URL.createObjectURL(image);
      imageEl.height = 64;
      imageEl.width = 64;
      imageTd.appendChild(imageEl);
    }
    newTr.appendChild(imageTd);

    usersTable.appendChild(newTr);
  });
}
