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
	
	//如果為false代表正在使用技能無法移動;
	var goMove = true;
	
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
		if(event.button==2 && goMove)
		{
			targetPositionX =  event.clientX;
			distanceX = Math.abs(targetPositionX - player.x);
			
			targetPositionY =  event.clientY;
			distanceY = Math.abs(targetPositionY - player.y);
			
			distance = Math.sqrt(distanceX*distanceX + distanceY*distanceY);
			
			Time = distance / player.speed;
			
			goStore = true;
			goFLAG = true;
		}
	};	
	
	//右健按住持續移動
	function rightMousePress(event) 
	{
		MouseX = event.clientX;
		MouseY = event.clientY;
		if(goStore && goMove)
		{
			targetPositionX =  event.clientX;
			distanceX = Math.abs(targetPositionX - player.x);
			
			targetPositionY =  event.clientY;
			distanceY = Math.abs(targetPositionY - player.y);
			
			distance = Math.sqrt(distanceX*distanceX + distanceY*distanceY);
			
			Time = distance / player.speed;
			
			goFLAG = true;
		}
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
		// S 83
		switch(event.keyCode)
		{
			case 52:
				if(ObjectWord.state==false)
				{
					ObjectWord.state=true;
					setTimeout(Sdelete,1800,ObjectWord.x-25,ObjectWord.y-16,50,50);
					setTimeout("ObjectWord.state=false;ObjectWord.x=-99;ObjectWord.y=-99;",1800);
				}
				break;
			case 81:
				break;
			case 87:
				if(ObjectWord.use)
				{
					
					player.speed = 30;
					targetPositionX =  ObjectWord.x;
					distanceX = Math.abs(targetPositionX - player.x);
					
					targetPositionY =  ObjectWord.y;
					distanceY = Math.abs(targetPositionY - player.y);
					
					distance = Math.sqrt(distanceX*distanceX + distanceY*distanceY);
					
					Time = distance / player.speed;
					
					goFLAG = true;
					
				}
				break;
			case 69:
				break;
			case 82:
				if(enemy.Ruse)
				{
					enemy.fly=true;
				}
				break;
			case 68:
				break;
			case 70:
				break;
			case 83:
				goFLAG = false;
				break;
		}
	}
	function Character() 
	{
		this.x = 50;
		this.y = 50;	
		this.speed = 5;
		
		this.draw = function() 
		{
			LSctx.clearRect(0, 0, LSctx.canvas.width, LSctx.canvas.height);
			//臉圓
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
		}
		
		this.move = function()
		{
			if(goFLAG)
			{
				if(targetPositionX > this.x)
				{
					this.x += distanceX/Time;
					
					if(Math.abs(targetPositionX - this.x) < distanceX/Time)
						this.x = targetPositionX;
				}
				else if(targetPositionX < this.x)
				{
					this.x -= distanceX/Time;
					
					if(Math.abs(targetPositionX - this.x) < distanceX/Time)
						this.x = targetPositionX;
				}
				
				if(targetPositionY > this.y)
				{
					this.y += distanceY/Time;
					
					if(Math.abs(targetPositionY - this.y) < distanceY/Time)
						this.y = targetPositionY;
				}
				else if(targetPositionY < this.y)
				{
					this.y -= distanceY/Time;
					
					if(Math.abs(targetPositionY - this.y) < distanceY/Time)
						this.y = targetPositionY;
				}
				
				if(this.x == targetPositionX && this.y == targetPositionY)
				{
					goFLAG = false;
					this.speed = 4.5;
				}
			}
		}
		
	}
	
	var player = new Character();
	
	enemy = new function()
	{
		this.x=500;
		this.y=300;
		this.size=30;
		this.kickSpeed=8;
		this.Ruse=false;
		this.fly=false;
		
		//移動需要計算的東西
		this.Slope = 0;
		this.Sx = 0;
		this.distance = 340;
		this.distanceX = 0;
		this.distanceY = 0;
		this.targetPositionX = 0;
		this.targetPositionY = 0;
		this.Time=0;
		
		this.draw = function() 
		{
			if(MouseX-8>this.x-36 && MouseX-8<this.x+36 && MouseY-8>this.y-36 && MouseY-8<this.y+36)
				this.Ruse=true;
			else
				this.Ruse=false;
			
			if(this.Ruse)
				Sctx.strokeStyle = '#ff0000';
			else
				Sctx.strokeStyle = '#000000';
			
			Sdelete(this.x-70,this.y-70,140,140);
			
			Sctx.beginPath();
			Sctx.lineWidth = 8;
			Sctx.arc(this.x,this.y,this.size,0,Math.PI*2,true);
			Sctx.stroke();
			Sctx.fillStyle = "#448844";
			Sctx.fill();
			Sctx.closePath();
			
			this.kicked();
		}
		
		this.kicked = function() 
		{
			if(this.fly==false)
			{
				// 可把 (this.y-player.y) 代成Y  (this.x-player.x)代成X 來理解下面這段算式  這段在計算 X Y各要前進多少
				// ((this.y-player.y)*x)^2 + ((this.x-player.x)*x)^2 = this.distance^2;
				// ((this.y-player.y)^2 * x^2 ) + ((this.x-player.x)^2 * x^2 ) = this.distance^2;
				// ( ( (this.y-player.y)^2 ) + ( (this.x-player.x)^2 ) ) * x^2 = this.distance^2;
				// x^2 = this.distance^2 / ( ( (this.y-player.y)^2 ) + ( (this.x-player.x)^2 ) );
				// x = Math.sqrt( this.distance^2 / ( ( (this.y-player.y)^2 ) + ( (this.x-player.x)^2 ) ) );
				this.Sx = Math.sqrt( Math.pow(this.distance,2)/(Math.pow( (this.y-player.y), 2) + Math.pow( (this.x-player.x), 2) ) );
				this.distanceX = Math.sqrt( Math.pow(this.distance, 2) - Math.pow((this.y-player.y)*this.Sx, 2) );
				this.distanceY = Math.sqrt( Math.pow(this.distance, 2) - Math.pow((this.x-player.x)*this.Sx, 2)  );
				this.Time = this.distance / this.kickSpeed;
				
				if(this.x-player.x > 0)
				{
					this.targetPositionX = this.x+ this.distanceX;
				}
				else if(this.x-player.x < 0)
				{
					this.targetPositionX = this.x- this.distanceX;
				}
				
				if(this.y-player.y > 0)
				{
					this.targetPositionY = this.y+ this.distanceY;
				}
				else if(this.y-player.y < 0)
				{
					this.targetPositionY = this.y- this.distanceY;
				}
			}
			else
			{
				if(this.x-player.x > 0)
				{
					console.log('this.x-player.x > 0');
					console.log('this.x:'+this.x);
					console.log('x速度:'+this.distanceX/this.Time);
					this.x += this.distanceX/this.Time;
					
					if(Math.abs(this.targetPositionX - this.x) < this.distanceX/this.Time || this.targetPositionX -this.x <=0)
						this.x = this.targetPositionX;
				}
				else if(this.x-player.x < 0)
				{
					console.log('this.x-player.x < 0');
					console.log('this.x:'+this.x);
					console.log('x速度:'+this.distanceX/this.Time);
					this.x -= this.distanceX/this.Time;
					
					if(Math.abs(this.targetPositionX - this.x) < this.distanceX/this.Time || this.targetPositionX -this.x >=0)
						this.x = this.targetPositionX;
				}
				
				if(this.y-player.y > 0)
				{
					this.y += this.distanceY/this.Time;
					
					if(Math.abs(this.targetPositionY - this.y) < this.distanceY/this.Time || this.targetPositionY -this.y <=0)
						this.y = this.targetPositionY;
				}
				else if(this.y-player.y < 0)
				{
					this.y -= this.distanceY/this.Time;
					
					if(Math.abs(this.targetPositionY - this.y) < this.distanceY/this.Time || this.targetPositionY -this.y >=0)
						this.y = this.targetPositionY;
				}
				if(this.x == this.targetPositionX && this.y == this.targetPositionY)
				{
					this.fly = false;
					console.log('到達目的地了');
					
				}
			}
			// console.log(Slope);
			// console.log(distance);
			// console.log(distanceX);
			// console.log(distanceY);
			// console.log(targetPositionX);
			// console.log(targetPositionY);
			// console.log(Time);
			

		}
	}
	
	
	ObjectQ = new function()
	{
		this.x=200;
		this.y=50;
		this.size=20;
		
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
		this.use=false;
		
		this.draw = function(mouseX,mouseY) 
		{
			if(this.state==false)
			{
				this.x=mouseX-10;
				this.y=mouseY-20;
			}
				
			if(this.state==true)
			{
				if(mouseX-10>this.x-40 && mouseX-10<this.x+20 && mouseY-20>this.y-27 && mouseY-10<this.y+37)
					this.use=true;
				else
					this.use=false;
				
				if(this.use)
					Sctx.strokeStyle = '#ff0000';
				else
					Sctx.strokeStyle = '#000000';
				
				Sctx.beginPath();
				Sctx.lineWidth = 5;
				Sctx.arc(this.x,this.y,this.size,0,Math.PI*2,true);
				Sctx.stroke();
				Sctx.fillStyle = "#44BB44";
				Sctx.fill();
				Sctx.closePath();
					
				Sctx.beginPath();
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
		enemy.draw();
		ObjectWord.draw(MouseX,MouseY);
    }
	
	setInterval(doGameLoop, 16);
}