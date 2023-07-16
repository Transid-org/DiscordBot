const { Client } = require("discord.js");
const { gatewayGuildId, realGuildId } = require('../../config.json');

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
		interaction.client.guilds.fetch(realGuildId).then(async guild => {
			guild.members.ban(interaction.targetId, "Rejected.");
		});

		await interaction.reply({
			content : "Rejected.",
			ephemeral : true
		});
    }
};