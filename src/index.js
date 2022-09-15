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

  const addUserButton = document.getElementById("submit-data");
  addUserButton.addEventListener("click", () =>
    addUser(
      usernameInput.value,
      emailInput.value,
      addressInput.value,
      adminInput.checked
    )
  );

  const emptyButton = document.getElementById("empty-table");
  emptyButton.addEventListener("click", () => {
    users = [];
    drawUsersTable();
  });
}

function addUser(username, email, address, admin) {
  let index = users.findIndex((user) => user.username === username);
  if (index === -1) {
    users.push({
      username: username,
      email: email,
      address: address,
      admin: admin
    });
  } else {
    users[index] = { username, email, address, admin };
  }
  drawUsersTable();
}

function drawUsersTable() {
  const usersTable = document.getElementById("users-table");
  usersTable.innerHTML =
    "<tr><td>Username</td><td>Email</td><td>Address</td><td>Admin</td></tr>";
  users.forEach(({ username, email, address, admin }) => {
    let newTr = document.createElement("tr");

    [username, email, address].forEach((data) => {
      let newTd = document.createElement("td");
      newTd.innerText = data;
      newTr.appendChild(newTd);
    });

    let adminTd = document.createElement("td");
    adminTd.innerText = admin ? "X" : "-";
    newTr.appendChild(adminTd);

    usersTable.appendChild(newTr);
  });
}
