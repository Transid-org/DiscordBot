const { REST, Routes } = require('discord.js');
const usersToChannelThreads = require("../../usersToChannelThreads.js");
const { gatewayGuildId, realGuildId, inviteChannel } = require('../../config.json');

module.exports = {
	data : {
		name : "Accept",
		type : 2,
		dm_permission : false,
		default_member_permissions : 0
	},
	async execute(interaction) {
		interaction.client.guilds.fetch(realGuildId).then(async realGuild => {
			realGuild.channels.fetch(inviteChannel).then(async chan => {
				return chan.createInvite({
					maxAge : 0,
					maxUses: 1
				});
			}).then(async invite => {
				interaction.client.users.fetch(interaction.targetId).then(async user => {
					user.send("https://discord.gg/" + invite.code).then(async message => {
						interaction.client.guilds.fetch(gatewayGuildId).then(async guild => {
							guild.members.kick(interaction.targetId, "Accepted!");
							guild.channels.fetch(usersToChannelThreads[interaction.targetId].channel).then(async channel => {
								await channel.threads.fetch(usersToChannelThreads[interaction.targetId].thread).then(async thread => {
									thread.setLocked(true);
									thread.setArchived(true);
									delete usersToChannelThreads[interaction.targetId];
								});
							});
						});
					});
				});
			});
		});

		await interaction.reply({
			content : "Accepted!",
			ephemeral : true
		});
    }
};