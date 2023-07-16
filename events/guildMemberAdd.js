const { Events } = require('discord.js');
const { ChannelType } = require('discord.js');
const usersToChannelThreads = require("../usersToChannelThreads.js");
const { gatewayGuildId, gatewayChannel, modPing, infoLink } = require('.././config.json');

module.exports = {
	name: Events.GuildMemberAdd,
	async execute(interaction) {
        if(interaction.guild.id == gatewayGuildId) {
            interaction.client.guilds.fetch(gatewayGuildId).then(async guild => {
                guild.channels.fetch(gatewayChannel).then(async channel => {
                    await channel.threads.create({
                        name : interaction.user.username,
                        type: ChannelType.PrivateThread
                    }).then(async thread => {
                        usersToChannelThreads[interaction.user.id] = {channel : channel.id, thread : thread.id};
                        thread.send("Welcome to the interview process of the **transid.org** gateway server where we filter out trolls from gaining access to the real server and editing features of the wiki.\nA <@&" + modPing + "> will ask you questions regarding your intentions shortly.\nIf you haven't yet, be sure to read " + infoLink + " for info about what this is.");
                        await thread.members.add(interaction.user.id);
                    });
                });
            });
        }
	}
};