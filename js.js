fetch("https://5c82fa8d9f69.ngrok-free.app/api/admin/category", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
})
    .then((r) => r.json())
    .then((r) => {
        console.log(r);
    });
