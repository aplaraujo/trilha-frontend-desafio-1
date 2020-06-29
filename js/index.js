//https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo

let tabUsers = null;
let allUsers = [];

window.addEventListener('load', () => {
    tabUsers = document.querySelector('#users');
    fetchUsers();
});

function render() {
    renderUserList()
}

async function fetchUsers() {
    const res = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo');
    const json = await res.json();
    allUsers = json.results.map(user => {
        const { picture, name, email, phone, location } = user;
        return {
            picture: picture.medium,
            name: name.first,
            email: email,
            phone: phone,
            city: location.city,
            state: location.state
        }
    });
    render()
    console.log(allUsers)
}

function renderUserList() {
    let usersHTML = '<div>';
    allUsers.forEach(user => {
        const { picture, name, email, phone, city, state } = user;
        const userHTML = `
            <div class="user-row">
                <div class="column"><a href=""><img src="${user.picture}" alt="${user.name}"></a></div>
                <div class="column"><a href="">${user.name}</a></div>
                <div class="column"><a href="">${user.email}</a></div>
                <div class="column"><a href="">${user.phone}</a></div>
                <div class="column"><a href="">${user.city} - ${user.state}</a></div>
                <div class="column">
                    <div class="icons">
                        <a href=""><ion-icon name="trash"></ion-icon></a>
                        <a href=""><ion-icon name="apps-outline"></ion-icon></a>
                        <a href=""><ion-icon name="checkmark-outline"></ion-icon></a>
                    </div>
                </div>
            </div>
        `;
        usersHTML += userHTML;
    })
    tabUsers.innerHTML = usersHTML;
}

