const botconfig = require("./botconfig.json");
const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
  console.log(`${bot.user.username} jest online!`);
  bot.user.setActivity("jestem online!", {type: "WATCHING"});
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if (message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);


  if(cmd === `${prefix}botinfo`){

    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("info bota")
    .setColor("#ff0000")
    .setThumbnail(bicon)
    .addField("nazwa bota", bot.user.username)
    .addField("Stwozony w ", bot.user.createdAt);

    return message.channel.send(botembed);
  }
   if(cmd === `${prefix}serverinfo`){

     let sicon = message.guild.iconURL;
     let serverembed = new Discord.RichEmbed()
     .setDescription("informacje Servera")
     .setColor("#ff0000")
     .setThumbnail(sicon)
     .addField("nazwa Servera",  message.guild.name)
     .addField("Stwozono w", message.guild.createdAt)
     .addField("Dołonczyłeś w", message.member.joinedAt)
     .addField("całkowita liczba członków", message.guild.memberCount);

      return message.channel.send(serverembed);
   }

   if(cmd === `${prefix}Report`){

     let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
     if(!rUser) return message.channel.send("Nie mogę znaleźć użytkownika.");
     let reason = args.join(" ").slice(22);

     let reportEmbed = new Discord.RichEmbed()
     .setDescription("Raport")
     .setColor("#19ff00")
     .addField("zgłaszany użytkownik", `${rUser} with id: ${rUser.id}`)
     .addField("zreportował go",`${message.author} jego id ${message.author.id}`)
     .addField("Kanał", message.channel)
     .addField("Czas", message.createdAt)
     .addField("powód", reason);



     let reportschannel = message.guild.channels.find(`name`, "raporty");
     if(!reportschannel) return message.channel.send("Nie można znaleźć kanału raportów.");


     message.delete().catch(O_o=>{});
     reportschannel.send(reportEmbed);

     return
   }

   if(cmd === `${prefix}report`){

     let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
     if(!rUser) return message.channel.send("Nie mogę znaleźć użytkownika.");
     let reason = args.join(" ").slice(22);

     let reportEmbed = new Discord.RichEmbed()
     .setDescription("Raport")
     .setColor("#19ff00")
     .addField("zgłaszany użytkownik", `${rUser} with id: ${rUser.id}`)
     .addField("zreportował go",`${message.author} jego id ${message.author.id}`)
     .addField("Kanał", message.channel)
     .addField("Czas", message.createdAt)
     .addField("powód", reason);



     let reportschannel = message.guild.channels.find(`name`, "raporty");
     if(!reportschannel) return message.channel.send("Nie można znaleźć kanału raportów.");


     message.delete().catch(O_o=>{});
     reportschannel.send(reportEmbed);

     return
   }

   if(cmd === `${prefix}kick`){

   //!kick @daeshan askin for it

   let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
   if(!kUser) return message.channel.send("Can't find user!");
   let kReason = args.join(" ").slice(22);
   if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("nie można znaleść kolege!");
   if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("nie można wyzucic tej osoby!");

   let kickEmbed = new Discord.RichEmbed()
   .setDescription("~Kick~")
   .setColor("#e56b00")
   .addField("wyzucony uzotnik", `${kUser} with ID ${kUser.id}`)
   .addField("wyzucony przez", `<@${message.author.id}> with ID ${message.author.id}`)
   .addField("na kanale", message.channel)
   .addField("Czas", message.createdAt)
   .addField("powód", kReason);

   let kickChannel = message.guild.channels.find(`name`, "u-config");
   if(!kickChannel) return message.channel.send("nie można znaleźć kanału incydentów.");

   message.guild.member(kUser).kick(kReason);
   kickChannel.send(kickEmbed);

   return
 }





});

bot.login(botconfig.token);
