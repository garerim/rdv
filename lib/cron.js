const cron = require("node-cron");

const myCronTask = () => {
  envoieNotifRdv1j();
  envoieNotifRdv1h();
  rdvEstPasse();
};

const envoieNotifRdv1j = () => {
  fetch("http://localhost:3000/api/send-email/cronrdv1j")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item) => {
        const emailData = {
          userEmail: item.userEmail,
          startDate: item.startDate,
          description: item.description,
          docName: item.docName,
        };

        fetch("http://localhost:3000/api/send-email/notifrdv", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailData),
        });
      });
    })
    .catch((error) => {
      console.error("Error sending notification:", error);
    });
};

const envoieNotifRdv1h = () => {
  fetch("http://localhost:3000/api/send-email/cronrdv1h")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item) => {
        const emailData = {
          userEmail: item.userEmail,
          startDate: item.startDate,
          description: item.description,
          docName: item.docName,
        };

        fetch("http://localhost:3000/api/send-email/notifrdv", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailData),
        });
      });
    })
    .catch((error) => {
      console.error("Error sending notification:", error);
    });
};

const rdvEstPasse = () => {
  fetch("http://localhost:3000/api/cron/rdvpasses");
};

cron.schedule("* * * * *", myCronTask);

console.log("Tâche cron configurée pour s'exécuter toutes les minutes");
