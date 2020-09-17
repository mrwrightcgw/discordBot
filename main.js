const Discord = require(`discord.js`);
const {prefix, token} = require(`./config.json`)
const client =  new Discord.Client();

client.once(`ready`, () => {
    console.log(`Cambot is online!`);
});

function getRandomInt(min, max) {
    return (Math.round(Math.random() * (max-min)) + min);
}

client.on(`message`, message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();
    if (command === `ping`) {
        message.channel.send(`pong!`);
    } else if (command === `youtube`) {
        if (message.guild.id == 192667026882297857) {
            message.channel.send(`https://www.youtube.com/kingkearns`);
        }
    } else if (command === `twitch`) {
        if (message.guild.id == 192667026882297857) {
            message.channel.send(`https://www.twitch.tv/kingkearns`);
        }
    } else if (command === `server`) {
        message.channel.send(`Server Name: ${message.guild.name}\nTotal Members: ${message.guild.memberCount}` +
        `\nServer Created At: ${message.guild.createdAt}\n${message.author} Joined At: ${message.guild.joinedAt}`);
    } else if (command == `shoutout`) {
        var rand = getRandomInt(0, 6);
        if (args[0] != undefined) {
            if (args[0] == `<@!` + message.author.id + `>`) {
                message.channel.send(`HEY! ${args[0]} is trying to shoutout themselves! Come on!`);
            } else if (rand == 0 || rand == 5) {
                message.channel.send(`Give it up for ${args[0]}! They the MVP!`);
            } else if (rand == 1 || rand == 4) {
                message.channel.send(`${args[0]} is the greatest person in the world!`);
            } else {
                message.channel.send(`We just wanna say we love you ${args[0]}! You are appreciated.`);
            }
        } else {
            if (rand == 0 || rand == 5) {
                message.channel.send(`We were gonna give a shout out to someone, but ${message.author} forgot to tell us who, what a dummy.`);
            } else if (rand == 1 || rand == 4) {
                message.channel.send(`Hey ${message.author}, maybe tell use who to shoutout, silly pants.`);
            } else {
                message.channel.send(`Give us a name ${message.author}! We need a NAME!!`);
            }
        }
    } else if (command == `timeout`){
        if (args[0] != undefined) {
            const user = message.mentions.users.first();
            const target =  message.guild.member(user);
            const user2 = message.author;
            const member = message.guild.member(user2);
            const channelid = message.guild.afkChannelID;
            const channel = message.guild.channels.cache.get(channelid);
            if (target != null) {
                if (member.user.id == 120961894424117249) {
                    message.channel.send(`Hey ${args[0]}, why don't you take a breather.`)
                    if (channel != undefined && target.voice.channel != null) {
                        target.voice.setChannel(channel);
                    } else {
                        target.voice.setChannel(null);
                    }
                } else {
                    if (target.user.id == 120961894424117249) {
                        message.channel.send(`How dare you try to timeout ${args[0]}!?`);
                    } else if (message.guild.id == 192667026882297857) {
                        if (member.roles.highest != 479091103065440256 && member.roles.highest != 204088955493154816) {
                            message.channel.send(`You have no power here ${message.author} the loser.`);
                        } else {
                            if (target.roles.highest == 479091103065440256 || target.roles.highest == 204088955493154816) {
                                message.channel.send(`Sorry ${message.author}, ${args[0]} is too cool to timeout.`);
                            } else {
                                message.channel.send(`Hey ${args[0]}, why don't you take a breather.`)
                                if (channel != undefined && target.voice.channel != null) {
                                    target.voice.setChannel(channel);
                                } else {
                                    target.voice.setChannel(null);
                                }
                            }
                        }
                    } else {
                        message.channel.send(`Hey ${args[0]}, why don't you take a breather.`)
                        if (channel != undefined && target.voice.channel != null) {
                            target.voice.setChannel(channel);
                        } else {
                            target.voice.setChannel(null);
                        }
                    }
                }
            } else {
                message.channel.send(`We don't know who that is.`);
            }
        } else {
            message.channel.send(`${message.author}, you need to mention someone to timeout.`);
        }
    } else if (command == `roll`) {
        if (args[0] != undefined && args[0].length > 2) {
            var range = args[0];
            if (range[0] == '-') {
                message.channel.send(`Sorry, no negative numbers.`);
            } else {
                var values = range.split("-");
                var min = parseInt(values[0]);
                var max = parseInt(values[1]);
                if (values[1] == "") {
                    message.channel.send(`Sorry, no negative numbers.`);
                } else if (max < min) {
                    message.channel.send(`${message.author}, try formating it like this: '!random min-max'.`);
                } else {
                    var result = getRandomInt(min, max);
                    if (!isNaN(result)) {
                        message.channel.send(`${message.author} rolled ${result}.`);
                    } else {
                        message.channel.send(`Hey! Those weren't numbers!`);
                    }
                }
            }
        } else {
            var result = getRandomInt(1, 100);
            message.channel.send(`${message.author} rolled ${result}.`);
        }
    } else if (command == `goodnight`) {
        message.channel.send(`${message.author} says goodnight everyone!`);
        const user = message.author;
        member = message.guild.member(user);
        member.voice.setChannel(null);
    }
});


client.login(token);
