/* jshint esversion: 8 */

module.exports.channels = {
    cache_findByID: function(member, id) {
        let r = member.guild.channels.cache.find(c => c.id === id);
        return r;
    }
};

module.exports.roles = {
    cache_findByID: function(member, id) {
        let r = member.guild.roles.cache.find(a => a.id === id);
        return r;
    }
};