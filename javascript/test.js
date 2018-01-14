function gameload()
{
	//取得指定的canvas物件
	var backgroundCanvas = document.getElementById('background');
	var LeeSinCanvas = document.getElementById('LeeSin');
	var SkillCanvas = document.getElementById('Skill');
	var Bctx = backgroundCanvas.getContext('2d'); 
	var LSctx = LeeSinCanvas.getContext('2d'); 
	var Sctx = SkillCanvas.getContext('2d'); 
	//LSctx.fillStyle = 'rgba(255, 255, 255, 0)';
	
	//設定canvas長寬
	Bctx.canvas.width = window.innerWidth -20;
	Bctx.canvas.height = window.innerHeight -30;
	LSctx.canvas.width = window.innerWidth -20;
	LSctx.canvas.height = window.innerHeight -30;
	Sctx.canvas.width = window.innerWidth -20;
	Sctx.canvas.height = window.innerHeight -30;
			
	
	//如果true人物將會移動
	var goFLAG = false;	
	
	//如果true將會執行rightMousePress 持續記錄座標(滑鼠按住)
	var goStore = false;
	
	//移動速度
	var speed = 4.5;
	
	//滑鼠位置
	var MouseX = 0;
	var MouseY = 0;
	
	//紀錄移動的目標位置
	var targetPositionX, targetPositionY;
	
	//紀錄移動的目標位置距離
	var distanceX, distanceY, distance;
	
	//記錄到目的地所花費的時間
	var Time;
	
	//增加監聽器(監聽右鍵按下)
	document.addEventListener("mousedown", trackMousePosition);
	
	//增加監聽器(監聽右鍵按住)
	document.addEventListener("mousemove", rightMousePress);
	
	//增加監聽器(監聽右鍵彈起)
	document.addEventListener("mouseup", rightMouseUp);
	
	//增加監聽器(監聽鍵盤)
	document.addEventListener("keydown", checkKeyBoard);
	
	//儲存滑鼠的座標
	function trackMousePosition(event) 
	{
		if(event.button==2)
		{
			targetPositionX =  event.clientX;
			distanceX = Math.abs(targetPositionX - player.x);
			
			targetPositionY =  event.clientY;
			distanceY = Math.abs(targetPositionY - player.y);
			
			distance = Math.sqrt(distanceX*distanceX + distanceY*distanceY);
			
			Time = distance / speed;
			
			goStore = true;
			goFLAG = true;
		}
	};	
	
	//右健按住持續移動
	function rightMousePress(event) 
	{
		if(goStore==true)
		{
			targetPositionX =  event.clientX;
			distanceX = Math.abs(targetPositionX - player.x);
			
			targetPositionY =  event.clientY;
			distanceY = Math.abs(targetPositionY - player.y);
			
			distance = Math.sqrt(distanceX*distanceX + distanceY*distanceY);
			
			Time = distance / speed;
			
			goStore = true;
			goFLAG = true;
		}
		
		MouseX = event.clientX;
		MouseY = event.clientY;
	};	
	
	//右健彈起
	function rightMouseUp(event) 
	{
		if(event.button==2)
			goStore = false;	
	};
	
	function checkKeyBoard(event)
	{
		// 4 52
		// Q 81
		// W 87
		// E 69
		// R 82
		// D 68
		// F 70
		switch(event.keyCode)
		{
			case 52:
				ObjectWord.draw(MouseX,MouseY);
				break;
			case 81:
				break;
			case 87:
				break;
			case 69:
				break;
			case 82:
				break;
			case 68:
				break;
			case 70:
				break;
		}
	}
	
	player = new function() 
	{
		this.x = 50;
		this.y = 50;
		
		this.draw = function() 
		{
			//臉圓
			LSctx.clearRect(0, 0, LSctx.canvas.width, LSctx.canvas.height);
			LSctx.beginPath();
			LSctx.lineWidth = 8;
			LSctx.arc(this.x,this.y,30,0,Math.PI*2,true);
			LSctx.stroke();
			LSctx.fillStyle = "#B97A57";//#4FC1EE
			LSctx.fill();
			LSctx.closePath();
			
			//眼睛的蹦帶
			LSctx.beginPath();
			LSctx.lineWidth = 3;
			LSctx.moveTo(this.x-30,this.y-3);
			LSctx.lineTo(this.x+30,this.y+2);
			LSctx.lineTo(this.x+30,this.y-8);
			LSctx.lineTo(this.x-30,this.y-13);
			LSctx.lineTo(this.x-30,this.y-3);
			LSctx.stroke();
			LSctx.fillStyle = "#992222";//#4FC1EE
			LSctx.fill();
			LSctx.closePath();
			LSctx.beginPath();
			LSctx.moveTo(this.x-30,this.y+2);
			LSctx.lineTo(this.x+30,this.y-3);
			LSctx.lineTo(this.x+30,this.y-13);
			LSctx.lineTo(this.x-30,this.y-8);
			LSctx.lineTo(this.x-30,this.y+2);
			LSctx.stroke();
			LSctx.fillStyle = "#992222";//#4FC1EE
			LSctx.fill();
			LSctx.closePath();
			
			//嘴巴
			LSctx.beginPath();
			LSctx.lineWidth = 2;
			LSctx.moveTo(this.x+10,this.y+20);
			LSctx.lineTo(this.x-10,this.y+20);
			LSctx.stroke();
			LSctx.closePath();
			
			/*
			//鬍渣
			LSctx.beginPath();
			LSctx.lineWidth = 1;
			LSctx.moveTo(this.x+10,this.y+32);
			LSctx.lineTo(this.x+10,this.y+30);
			LSctx.moveTo(this.x+10,this.y+28);
			LSctx.lineTo(this.x+10,this.y+26);
			LSctx.moveTo(this.x+10,this.y+24);
			LSctx.lineTo(this.x+10,this.y+22);
			LSctx.moveTo(this.x+10,this.y+20);
			LSctx.lineTo(this.x+10,this.y+18);
			LSctx.moveTo(this.x+6,this.y+31);
			LSctx.lineTo(this.x+6,this.y+29);
			LSctx.moveTo(this.x+6,this.y+27);
			LSctx.lineTo(this.x+6,this.y+25);
			LSctx.moveTo(this.x+6,this.y+23);
			LSctx.lineTo(this.x+6,this.y+21);
			LSctx.moveTo(this.x+3,this.y+20);
			LSctx.lineTo(this.x+3,this.y+18);
			LSctx.moveTo(this.x,this.y+23);
			LSctx.lineTo(this.x,this.y+21);			
			LSctx.moveTo(this.x-3,this.y+20);
			LSctx.lineTo(this.x-3,this.y+18);	
			LSctx.moveTo(this.x-6,this.y+31);
			LSctx.lineTo(this.x-6,this.y+29);
			LSctx.moveTo(this.x-6,this.y+27);
			LSctx.lineTo(this.x-6,this.y+25);
			LSctx.moveTo(this.x-6,this.y+23);
			LSctx.lineTo(this.x-6,this.y+21);	
			LSctx.moveTo(this.x-10,this.y+32);
			LSctx.lineTo(this.x-10,this.y+30);
			LSctx.moveTo(this.x-10,this.y+28);
			LSctx.lineTo(this.x-10,this.y+26);
			LSctx.moveTo(this.x-10,this.y+24);
			LSctx.lineTo(this.x-10,this.y+22);
			LSctx.moveTo(this.x-10,this.y+20);
			LSctx.lineTo(this.x-10,this.y+18);
			LSctx.stroke();
			LSctx.closePath();
			*/
		}
		
		this.move = function()
		{
			if(goFLAG)
			{
				if(targetPositionX > this.x)
				{
					this.x += distanceX/Time;
					
					if(Math.abs(targetPositionX - this.x) < speed*(distanceX/(distanceX+distanceY)))
						this.x = targetPositionX;
				}
				else if(targetPositionX < this.x)
				{
					this.x -= distanceX/Time;
					
					if(Math.abs(targetPositionX - this.x) < speed*(distanceX/(distanceX+distanceY)))
						this.x = targetPositionX;
				}
				
				if(targetPositionY > this.y)
				{
					this.y += distanceY/Time;
					
					if(Math.abs(targetPositionY - this.y) < speed*(distanceY/(distanceX+distanceY)))
						this.y = targetPositionY;
				}
				else if(targetPositionY < this.y)
				{
					this.y -= distanceY/Time;
					
					if(Math.abs(targetPositionY - this.y) < speed*(distanceY/(distanceX+distanceY)))
						this.y = targetPositionY;
				}
				
				if(this.x == targetPositionX && this.y == targetPositionY)
				{
					goFLAG = false;
				}
			}
		}
		
	}
	
	ObjectQ = new function()
	{
		this.x=200;
		this.y=50;
		this.size=20
		
		this.draw = function() 
		{
			Sctx.beginPath();
			Sctx.lineWidth = 8;
			Sctx.arc(this.x,this.y,this.size,0,Math.PI*2,true);
			Sctx.stroke();
			Sctx.fillStyle = "rgba(79, 193, 238, 0.5)";
			Sctx.fill();
			Sctx.closePath();
		}
	}	
	
	//眼
	ObjectWord = new function() //////////////////////////////////(李星位置X-滑鼠位置X)^2 + (李星位置Y-滑鼠位置Y)^2 的開根號(斜邊) < 我要設的範圍(長度) 才可以放招式
	{
		this.x=0;
		this.y=0;
		this.size=10;
		this.state=false;
		
		this.draw = function(mouseX,mouseY) 
		{
			if(this.state==false)
			{
				this.x=mouseX-10;
				this.y=mouseY-20;
				
				Sctx.beginPath();
				Sctx.lineWidth = 3;
				Sctx.arc(this.x,this.y,this.size,0,Math.PI*2,true);
				Sctx.stroke();
				Sctx.fillStyle = "#44BB44";
				Sctx.fill();
				Sctx.closePath();
					
				Sctx.beginPath();
				Sctx.lineWidth = 2;
				Sctx.moveTo(this.x-4,this.y+12);
				Sctx.lineTo(this.x+4,this.y+12);
				Sctx.lineTo(this.x+7,this.y+30);
				Sctx.lineTo(this.x-7,this.y+30);
				Sctx.lineTo(this.x-4,this.y+12);
				Sctx.stroke();
				Sctx.fillStyle = "#115117";
				Sctx.fill();
				Sctx.closePath();	
					
				Sctx.beginPath();
				Sctx.lineWidth = 2;
				Sctx.moveTo(this.x-4,this.y+12);
				Sctx.lineTo(this.x-20,this.y+3);
				Sctx.lineTo(this.x-20,this.y+10);
				Sctx.lineTo(this.x-4,this.y+12);
					
				Sctx.moveTo(this.x+4,this.y+12);
				Sctx.lineTo(this.x+20,this.y+3);
				Sctx.lineTo(this.x+20,this.y+10);
				Sctx.lineTo(this.x+4,this.y+12);
					
				Sctx.stroke();
				Sctx.fillStyle = "#c1b74b";
				Sctx.fill();
				Sctx.closePath();
				
				this.state=true;
				
				setTimeout(Sdelete,2000,this.x-22,this.y-13,45,45);
				setTimeout("ObjectWord.state=false;",2000);
			}

		}
	}
	
	//清除Skill畫布用
	function Sdelete(x,y,width,height)
	{
		Sctx.clearRect( x, y, width, height);
	}
	
	function doGameLoop() 
	{
		player.move();
		player.draw();
    }
	
	setInterval(doGameLoop, 16);
}