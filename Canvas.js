"use strict";
// console.log('Canvas.js start '+new Date());
class Path	//describes canvas path
{
	constructor()
	{
		this.paths = [];
		this.name = 'path';
		this.close = false;
	}
	
	get path()
	{
		return this.paths;
	}
	
	set path(data)
	{
		if (typeof data == 'object')
		{
			var x = {
				'type'	: data.type,
				'x'		: data.x,
				'y'		: data.y
			}
			if (x.type == 'beziercurve' || x.type == 'bezier')
			{
				x.type = 'bezier';
				x.cp1x = data.cp1x;
				x.cp1y = data.cp1y;
				x.cp2x = data.cp2x;
				x.cp2x = data.cp2x;
				x.x = data.x;
				x.y = data.y;
			}
			else if (x.type == 'quadraticcurve' || x.type == 'quadratic')
			{
				x.type = 'quadratic';
				x.cpx = data.cpx;
				x.cpy = data.cpy;
			}
			else if (x.type == 'arc')
			{
				x.radius = data.radius;
				x.startAngle = data.startAngle;
				x.endAngle = data.endAngle;
				if (typeof data.anticlockwise != 'undefined')
				{
					x.anticlockwise = data.anticlockwise;
				}
				else
				{
					x.anticlockwise = false;
				}
			}
			else if (x.type == 'arcto')
			{
				x.radius = data.radius;
				x.x1 = data.x1 || data.x;
				x.y1 = data.xy || data.y;
				x.x2 = data.x2;
				x.y2 = data.y2;
			}
			
			this.paths[this.paths.length] = x;
		}
	}
	
	/*set close(data)
	{
		this.close = data;
	}
	
	get close()
	{
		return this.close;
	}
	
	set drawType(data)
	{
		this.close = data;
	}
	
	get drawType()
	{
		return this.close;
	}*/
}

class Canvas
{
	// var canvas	= null;	// reference to canvas
	// var ctx		= null;	// canvas.getContext("2d")
	
	constructor(obj)	// initialize Canvas class
	{
		this.name = 'canvas';
		this.canvas =
			document.getElementById(obj) ||
			document.querySelector(obj) ||
			obj;
		if (typeof this.canvas != 'object')
		{
			console.error('Canvas constructor Failed! Canvas(obj); obj must be canvas object but is: '+ typeof this.canvas);
		}
		this.ctx = this.canvas.getContext('2d');
		
		this.settings =		// settings object
		{
			fillStyle:		'#000000',		// default background color
			strokeStyle:	'#000000',		// default background color
			//Text styles
			font:			'10px arial',	// default font
			textAlign:		'left',			// default text align
			textBaseline:	'alphabetic',	// default text baseline
			direction:		'inherit',		// default text direction
			//Line styles
			lineWidth:		1,				// default line width
			lineCap:		'butt',			// default line cap
			lineJoin:		'miter',		// default line join
			miterLimit:		10,				// default miter limit
			setLineDash:	[],				// default line dash
			lineDashOffset:	0,				// default line dash offset
			shadowColor:	'black',		// default shadow color
			shadowBlur:		0,				// default shadow blur
			shadowOffsetX:	0,				// dafault shadow x-axis offset
			shadowOffsetY:	0				// dafault shadow y-axis offset
		}
		this.vars={};
	}
	
	set(data)	// replace default settings
	{
		if (typeof data != 'undefined')
		{
			typeof data.fillStyle != 'undefined'		? this.settings.fillStyle		= this.ctx.fillStyle		= data.fillStyle		: this.settings.fillStyle;		// replace default background color
			typeof data.font != 'undefined'				? this.settings.font			= this.ctx.font				= data.font				: this.settings.font;			// replace default font (interpreted as css font)
			typeof data.textAlign != 'undefined'		? this.settings.textAlign		= this.ctx.textAlign		= data.textAlign		: this.settings.textAlign;		// replace default text align
			typeof data.textBaseline != 'undefined' 	? this.settings.textBaseline	= this.ctx.textBaseline		= data.textBaseline		: this.settings.textBaseline;	// replace default text baseline
			typeof data.direction != 'undefined'		? this.settings.direction		= this.ctx.direction		= data.direction		: this.settings.direction;		// replace default text direction
			typeof data.strokeStyle != 'undefined'		? this.settings.strokeStyle		= this.ctx.strokeStyle		= data.strokeStyle		: this.settings.strokeStyle;	// replace default border color
			typeof data.lineWidth != 'undefined'		? this.settings.lineWidth		= this.ctx.lineWidth		= data.lineWidth		: this.settings.lineWidth;		// replace default line width
			typeof data.lineCap != 'undefined'			? this.settings.lineCap			= this.ctx.lineCap			= data.lineCap			: this.settings.lineCap;		// replace default line cap
			typeof data.lineJoin != 'undefined'			? this.settings.lineJoin		= this.ctx.lineJoin			= data.lineJoin			: this.settings.lineJoin;		// replace default line join
			typeof data.miterLimit != 'undefined'		? this.settings.miterLimit		= this.ctx.miterLimit		= data.miterLimit		: this.settings.miterLimit;		// replace default miter limit
			typeof data.setLineDash != 'undefined'		? this.settings.setLineDash		= this.ctx.setLineDash		= data.setLineDash		: this.settings.setLineDash;	// replace default line dash
			typeof data.lineDashOffset  != 'undefined'	? this.settings.lineDashOffset	= this.ctx.lineDashOffset	= data.lineDashOffset	: this.settings.lineDashOffset;	// replace default line dash offset
			typeof data.shadowColor  != 'undefined'		? this.settings.shadowColor		= this.ctx.shadowColor		= data.shadowColor		: this.settings.shadowColor;	// replace default shadow color
			typeof data.shadowBlur  != 'undefined'		? this.settings.shadowBlur		= this.ctx.shadowBlur		= data.shadowBlur		: this.settings.shadowBlur;		// replace default shadow blur
			typeof data.shadowOffsetX  != 'undefined'	? this.settings.shadowOffsetX	= this.ctx.shadowOffsetX	= data.shadowOffsetX	: this.settings.shadowOffsetX;	// replace default shadow x-axis offset
			typeof data.shadowOffsetY  != 'undefined'	? this.settings.shadowOffsetY	= this.ctx.shadowOffsetY	= data.shadowOffsetY	: this.settings.shadowOffsetY;	// replace default shadow y-axis offset
		}
		
		return this;
	}
	
	rect(data)	// draw rectangular
	{
		if (typeof data == 'object')
		{
			this.ctx.fillRect(data.x, data.y, data.w, data.h);
		}
		else
		{
			this.ctx.fillRect(arguments[0], arguments[1], arguments[2], arguments[3]);
		}
		return this;
	}
	
	text(data)
	{
		var d =
		{
			text:	data.text,
			x:		data.x,
			y:		data.y,
			type:	data.type || 'normal'	// 'normal' || 'stroke' || 'both'
		}
		if (typeof data.maxWidth != 'undefined')
		{
			d.maxWidth = data.maxWidth || data[3];
			if (d.type == 'normal' || 'both')
			{
				this.ctx.fillText(d.text, d.x, d.y, d.maxWidth);
			}
			else if (d.type == 'stroke' || 'both')
			{
				this.ctx.strokeText(d.text, d.x, d.y, d.maxWidth);
			}
		}
		else
		{
			if (d.type == 'normal' || 'both')
			{
				this.ctx.fillText(d.text, d.x, d.y);
			}
			else if (d.type == 'stroke' || 'both')
			{
				this.ctx.strokeText(d.text, d.x, d.y);
			}
		}
		
		return this;
	}
	
	textSize(data, transfer)
	{
		if (typeof transfer == 'string')
		{
			this.vars[transfer] = this.ctx.measureText(data).width;
		}
		else
		{
			return this.ctx.measureText(data).width;
		}
	}
	
	path(data)
	{
		var d = [];
		if (data.name == 'path')
		{
			d = data.path;
		}
		else
		{
			console.error('path data must be class of Path');
		}
		
		this.ctx.beginPath()
		
		for (var i = 0; i < d.length; i++)
		{
			if (d[i].type == 'move')
			{
				this.ctx.moveTo(d[i].x, d[i].y);
			}
			else if (d[i].type == 'line')
			{
				this.ctx.lineTo(d[i].x, d[i].y);
			}
			else if (d[i].type == 'bezier')
			{
				this.ctx.bezierCurveTo(d[i].cp1x, d[i].cp1y, d[i].cp2x, d[i].cp2y, d[i].x, d[i].y);
			}
			else if (d[i].type == 'quadratic')
			{
				this.ctx.bezierCurveTo(d[i].cpx, d[i].cpy, d[i].x, d[i].y);
			}
			else if (d[i].type == 'arc')
			{
				this.ctx.arc(d[i].x, d[i].y, d[i].radius, d[i].startAngle, d[i].endAngle, d[i].anticlockwise);
			}
			else if (d[i].type == 'arcto')
			{
				this.ctx.arc(d[i].x1, d[i].y1, d[i].x2, d[i].y2, d[i].radius);
			}
			
		}
		
		if (d.close)
		{
			this.ctx.closePath();
		}
		if (d.drawType == 'fill')
		{
			this.ctx.fill();
		}
		else
		{
			this.ctx.stroke();
		}
		
		return this;
	}
	
	//return functions that break's chaining
	returnLinearGradient(data)
	{
		var g = this.ctx.createLinearGradient(data.x0 || data[0], data.y0 || data[1], data.x1 || data[2], data.y1 ||data[3]);
		if (typeof data.stops != 'undefined')
		{
			for (var i = 0; i < data.stops.length; i++)
			{
				g.addColorStop(data.stops[i].offset, data.stops[i].color);
			}
		}
		
		return g;
	}

	returnRadialGradient(data)
	{
		var g = this.ctx.createRadialGradient(data.x0 || data[0], data.y0 || data[1], data.r0 || data[2], data.x1 || data[3], data.y1 || data[4], data.r1 || data[5]);
		if (typeof data.stops != 'undefined')
		{
			for (var i = 0; i < data.stops.length; i++)
			{
				g.addColorStop(data.stops[i].offset, data.stops[i].color);
			}
		}
		
		return g;
	}
	
	returnPattern(data)
	{
		return this.ctx.createPattern(data.img || data[0], data.repeat || data[1]);
	}
}
// console.log('Canvas.js ready '+new Date());