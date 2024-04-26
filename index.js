class Player {
    constructor(name, race, archetype) {
this.name = name;
this.race = race 
this.archetype = archetype
    }

    describe(){
        return `${this.name} plays a ${this.race} who is a ${this.archetype}`
    }
}

class Campaign {
    constructor(name) {
        this.name = name;
        this.players = [];
    }

    describe() {
        return `${this.name} has ${this.players.length} players.`;
    }
}


class Menu {
    constructor() {
        this.campaigns = [];
        this.selectedCampaign = null;
    }

    start() {
        let selection = this.showMainMenuOptions();
        while (selection !== "0") {
            switch (selection) {
                case "1":
                    this.createCampaign();
                    break;
                case "2":
                    this.viewCampaign();
                    break;
                case "3":
                    this.deleteCampaign();
                    break;
                case "4":
                    this.displayCampaigns();
                    break;
                default:
                    alert("Invalid option.");
                    break;
            }
            selection = this.showMainMenuOptions();
        }
        alert('Exiting menu.');
    }

    showMainMenuOptions() {
        return prompt(`
        0) Exit
        1) Create New Campaign
        2) View Campaign
        3) Delete Campaign
        4) View All Campaigns
        `);
    }

    showCampaignMenuOptions(campaignInfo) {
        return prompt(`
        0) Exit
        1) Create New Player
        2) Delete Player

        ${campaignInfo}
        `);
    }

    displayCampaigns() {
        let campaignString = '';
        for (let i = 0; i < this.campaigns.length; i++) {
            campaignString += i + ') ' + this.campaigns[i].name + '\n';
        }
        alert(campaignString);
        console.log("it works")
    }

    createCampaign() {
        let name = prompt('Name your new campaign:');
        this.campaigns.push(new Campaign(name));
    }

    viewCampaign() {
        let index = prompt('Enter index of the Campaign you wish to view:');
        if (index > -1 && index < this.campaigns.length) {
            this.selectedCampaign = this.campaigns[index];
            let description = 'Campaign Name: ' + this.selectedCampaign.name + '\n';

            for (let i = 0; i < this.selectedCampaign.players.length; i++) {
                description += i + ') ' + this.selectedCampaign.players[i].describe() + '\n';
            }

            let selection = this.showCampaignMenuOptions(description);
            switch (selection) {
                case '1':
                    this.createPlayer();
                    break;
                case '2':
                    this.deletePlayer();
                    break;
            }
        } else {
            alert('Invalid campaign index.');
        }
    }
    deleteCampaign() {
        let index = prompt('Enter the index of the campaign you wish to delete:');
        if (index > -1 && index < this.campaigns.length) {
            console.log(this.campaigns[index]); // Log the campaign before deleting
            this.campaigns.splice(index, 1);
            alert('Campaign deleted successfully.');
        } else {
            alert('Invalid campaign index.');
        }
    }
    

    createPlayer() {
        let name = prompt('Enter new player name:');
        let archetype = prompt('Enter player\'s archetype:');
        let race = prompt('Enter player\'s race:');
        this.selectedCampaign.players.push(new Player(name, archetype, race));
    }

    deletePlayer() {
        let index = prompt('Enter the index of the player you wish to delete:');
        if (index > -1 && index < this.selectedCampaign.players.length) {
            this.selectedCampaign.players.splice(index, 1);
            alert('Player deleted successfully.');
        } else {
            alert('Invalid player index.');
        }
    }
}

let menu = new Menu();
menu.start();
