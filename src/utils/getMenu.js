/**
 * 
 */

module.exports = function getMenu() {
	return [
		{
	    	label: 'dmp.hz.netease.com',
	    	submenu: [
	    		{
	    			label: '127.0.0.1',
	    			type: 'radio',
	    		},
	    		{
	    			label: '59.111.166.236',
	    			type: 'radio',
	    		}
	    	]
	    },
	    {
	    	label: 'demo.local',
	    	submenu: [
	    		{
	    			label: '127.0.0.1',
	    			type: 'radio',
	    		},
	    		{
	    			label: '6.6.6.6',
	    			type: 'radio',
	    		}
	    	]
	    },
	    {
	    	label: 'exit',
	    	role: 'quit'
	    }
	]
};