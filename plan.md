1. Components
	1. Player
		1.  [] Hand Total
	2. AI Player
		1.  [] Resolve Hand
			1.  [] account for doubling only before first hit
			2.  [] Check BJ
			3.  [] Check for pairs/splitting
					1.  [] Should just play hand as normal after
				1.  [] AA yes
				2.  [] 20 No
				3.  [] 99
					1. Don't split if 7,10,A
				4.  [] 88 Split
				5.  [] 77
					1. 2-7 Split
				6.  [] 66 Split 2-6 (2 only if doubling after split)
				7.  [] 55 No
				8.  [] 44 Only split 5,6 if double after
				9.  [] 33, 22
					1. 2-3 Split if double after
					2. 4-7 split
			4.  [] Check if Ace
				1.  [] 20 - Stand
				2.  [] 19 - Double only vs 6, else stand
				3.  [] 18 
					1.  [] 6 or less Double
					2.  [] 7, 8 Stand
					3.  [] 9, 10, A Hit
				4.  [] 17
					1. 2 Hit
					2. 3-6 Double
					3. 7+ Hit  
				5.  [] 16 + 15
					1. 2,3 Hit
					2. 4-6 Double
					3. 7+ Hit  
				6.  [] 14 + 13
					1. 2-4 Hit
					2. 5-6 Double
					3. 7+ Hit  
			5.  [] Ace = false
				1.  [] 17+ stand
				2.  [] 13-16
					1. 2-6 Stand
					2. 7+ Hit
				3.  [] 12
					1. 2-3 Hit
					2. 4-6 Stand
					3. 7+ Hit
				4.  [] 11 Double
				5.  [] 10
					1. 2-9 Double
					2. 10+ Stand
				6.  [] 9
					1. 2 Stand
					2. 3-6 Double
					3. 7+ Hit
				7.  [] 8 Hit
	3. Board
		1. Controls
			1.  [] Buttons
		2. Hand
			1.  [] Take Bets
			2.  [] Pay out players
	4. Dealer
		1.  [] Hand Total
		2.  [] Resolve Hand
			1.  [] Check BJ
			2.  [] Ace = False
				1.  [] If score >= 17 stand
					1.  [] Else Hit
			3.  [] Ace = True
				1.  [] Hit on <18
					1. Soft 17 included
				2.  [] Stand on 18+
		3.  [] Pay out players