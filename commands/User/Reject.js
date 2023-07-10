const { Client } = require("discord.js");
const { gatewayGuildId, realGuidId } = require('../../config.json');

module.exports = {
	data : {
		name : "Reject",
		type : 2,
		dm_permission : false,
		default_member_permissions : 0
	},
	async execute(interaction) {
		interaction.client.guilds.fetch(gatewayGuildId).then(async guild => {
			guild.members.ban(interaction.targetId, "Rejected.");
		});
		interaction.client.guilds.fetch(realGuidId).then(async guild => {
			guild.members.ban(interaction.targetId, "Rejected.");
		});

		await interaction.reply({
			content : "Rejected.",
			ephemeral : true
		});
		
		// Delete stored thread and store email for future rejection protection.
    }
};