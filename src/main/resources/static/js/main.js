$(document).ready(function() {
	$('#loading').hide();
	showBook();//도서 호출
	$('#grid-container').empty();
    // jQuery 코드 작성
    $("#bestSeller-tab").click(function () {
        changeTab("bestSeller");
        $(".column1").css("flex-basis", "30%");
   	    $(".column2").css("flex-basis", "70%");
        $(".container2").show();
        
    });
    $("#donation-tab").click(function () {
        changeTab("donation");
        $(".container2").hide();
        $(".column1").css("flex-basis", "0%");
    	$(".column2").css("flex-basis", "100%");
    	    
    });

    $("#notification-tab").click(function () {
        changeTab("notification");
        $(".container2").hide();
        $(".column1").css("flex-basis", "0%");
    	$(".column2").css("flex-basis", "100%");
    });
    
});
//카트에 넣기 클릭 시
function handleClickCartButton() {
    $(document).on('click', '#cartButton', function() {
        let m_id = $('#id').val();
        let qty = 1;
        let book_num = $(this).attr('name');

        // 아이디가 있을 때
        if(m_id=='' || m_id==null || m_id=='null') {
            alert('로그인 후 이용해주세요');
            document.location="/login";
        } 
        // 아이디가 없을 때
        else {
            $.ajax({
                url: '/confirm_cart',
                type: 'post',
                data: { m_id: m_id,  qty:qty, book_num:book_num },
                dataType: 'text',
                success: function(data) {
                    if(data == "already") {
                        $.ajax({
                            url: '/update_cart',
                            type: 'post',
                            data: { m_id: m_id, qty:qty, book_num:book_num },
                            dataType: 'text',
                            success: function(data) {
                                if(data=="ok"){
                                    var confirmval = confirm('이미 장바구니에 존재하는 상품입니다. 장바구니로 이동하시겠습니까?');
                                    if(confirmval) {
                                        document.location="/cart";
                                    } else {

                                    }
                                } else {
                                    alert("오류로 인해 잠시후에 다시 시도해주세요.");
                                }
                            }
                        })
                    } else if(data=="ok"){
                        $.ajax({
                            url: '/insert_cart',
                            type: 'post',
                            data: { m_id: m_id, qty:qty, book_num:book_num },
                            dataType: 'text',
                            success: function(data) {
                                if(data=="ok"){
                                    var confirmval = confirm('장바구니에 상품을 담았습니다. 장바구니로 이동하시겠습니까?');
                                    if(confirmval) {
                                        document.location="/cart";
                                    } else {

                                    }
                                } else {
                                    alert("오류로 인해 잠시후에 다시 시도해주세요.");
                                }
                            }
                        })
                    } else {
                        alert("오류로 인해 잠시후에 다시 시도해주세요.");
                    }
                }
            })
        
		}
    });
}

//바로구매 클릭 시
function handleClickPaymentButton() {
    $(document).on('click', '#paymentButton', function() {
        let m_id = $('#id').val();
        let qty = 1;
        let book_num = $(this).attr('name');

        // 아이디가 있을 때
        if(m_id=='' || m_id==null || m_id=='null') {
            alert('로그인 후 이용해주세요');
            document.location="/login";
        } 
        // 아이디가 없을 때
        else {
            $.ajax({
                url: '/confirm_cart',
                type: 'post',
                data: { m_id: m_id,  qty:qty, book_num:book_num },
                dataType: 'text',
                success: function(data) {
                    if(data == "already") {
                        $.ajax({
                            url: '/update_cart',
                            type: 'post',
                            data: { m_id: m_id, qty:qty, book_num:book_num },
                            dataType: 'text',
                            success: function(data) {
                                if(data=="ok"){
                                    var confirmval = confirm('이미 장바구니에 존재하는 상품입니다. 결제페이지로 이동하시겠습니까?');
                                    if(confirmval) {
                                        document.location="/payment";
                                    } else {

                                    }
                                } else {
                                    alert("오류로 인해 잠시후에 다시 시도해주세요.");
                                }
                            }
                        })
                    } else if(data=="ok"){
                        $.ajax({
                            url: '/insert_cart',
                            type: 'post',
                            data: { m_id: m_id, qty:qty, book_num:book_num },
                            dataType: 'text',
                            success: function(data) {
                                if(data=="ok"){
                                    var confirmval = confirm('장바구니에 상품을 담았습니다. 결제페이지로 이동하시겠습니까?');
                                    if(confirmval) {
                                        document.location="/payment";
                                    } else {

                                    }
                                } else {
                                    alert("오류로 인해 잠시후에 다시 시도해주세요.");
                                }
                            }
                        })
                    } else {
                        alert("오류로 인해 잠시후에 다시 시도해주세요.");
                    }
                }
            })
        
		}
    });
}


/*---------------------------------------------------------------------------------아작스로 도서 뛰우기*/
function showBook() {
    $.ajax({
        url: '/selectpRe',  // 필요에 따라 URL 수정
        type: 'post',
        data: {},  // prod_num 값 추가하여 서버로 전달
        dataType: 'json',
        beforeSend: function() {},
        success: function(data) {
			appendBoxesToGrid(data);
			//카트에 넣기 클릭 시
			handleClickCartButton();
			//바로 결제 클릭시
			handleClickPaymentButton();
        },
    });
}
function suggestion(emotion) {
	alert(emotion);
	$('#grid-container').empty()
    $.ajax({
        url: '/suggestion',  // 필요에 따라 URL 수정
        type: 'post',
        data: {emotion:emotion+""},  // prod_num 값 추가하여 서버로 전달
        dataType: 'json',
        beforeSend: function() {},
        success: function(data) {
			appendBoxesToGrid(data);

        },
    });
}
function appendBoxesToGrid(data) {
	
    for (let i = 0; i < data.length; i++) {

        let box = `
            <div class="grid-cell">
                    		
                <div class='poster'>
                	<div  class = "image_overlay image_overlay_blur">
									<div class = "image_movieStory"><div class ="summary">${data[i]['BOOK_SUMMARY']}</div></div>
									<div>
			                            <a class="button cart" id="cartButton" name="${data[i]['BOOK_NUM']}">장바구니</a>
			                            <a class="button checkout" id="paymentButton" name="${data[i]['BOOK_NUM']}">바로결제</a>
			                            <a class="button dashboard" href="detail/${data[i]['BOOK_NUM']}">상세보기</a>
			                        </div>
					</div>
                    <img src="${data[i]['BOOK_COVER']}" alt="Main Image" class="main-image">
                    
                
                    <div class="explanation">
                    	<div>
                            <div class="title">${data[i]['BOOK_PRICE']}원</div>
                        </div>
                        <br>
                        <div>
                            <div class="title">${data[i]['BOOK_NAME']}</div>
                        </div>
                        <div>
                            <div class="subtitle">${data[i]['AUTHOR']}</div>
                        </div>
                        
                    </div>
                </div>
            </div>
            					
        `;
        
        $('#grid-container').append(box);

    }
    
    
    
}

/*---------------------------------------------------------------------------------*/
function changeTab(tab) {
    $(".tab-item").removeClass("active");
    $(".content-container").removeClass("active");

    $("#" + tab + "-tab").addClass("active");
    $("#" + tab).addClass("active");
}
//감정 모달 클릭 시키는 함수
function clickModalButton() {
  var modalBtn = document.getElementById("open-modal-btn");
  modalBtn.click();
}

document.addEventListener('DOMContentLoaded', function() {
	/*감정 모달 이벤트*/
	
	
	document.getElementById("open-modal-btn").addEventListener("click", function() {
      document.getElementById("modal-container").style.display = "flex";
    });

    document.getElementById("modal-container").addEventListener("click", function(event) {
      if (event.target.id === "modal-container") {
        document.getElementById("modal-container").style.display = "none";
      }
    });
    /*감정 모달 이벤트*/
    const chatGPT = async (messages, parameters = {}) => {
        const apiKeyResponse = await fetch('/apikey'); // Make an AJAX request to retrieve the API key
  		const apikey = await apiKeyResponse.text(); // Extract the API key from the response
  		console.log(apikey);
        if (messages[0].constructor === String) return await chatGPT([['user', messages[0]]]);
        messages = messages.map(line => ({ role: line[0],content: line[1].trim() }));
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: "Bearer " + apikey },
            body: JSON.stringify({ model: 'gpt-3.5-turbo', messages, ...parameters }),
        });

        const data = await response.json();

        if (data?.error?.message) throw new Error(data.error.message);

        return data.choices[0].message.content.trim();
    };
    
	let manualMode = false;
	let genre="";
	let grade="";
    async function sendMessage() {
		$('#loading').show();
        const inputElement = document.getElementById("input");
        const message = inputElement.value.trim();
        	if (message === "수동모드") {
		        manualMode = true;
		        alert("수동추천모드입니다.");
		    } else if (message === "수동추천모드취소") {
		        manualMode = false;
		        alert("수동추천모드가 취소되었습니다.");
		        $('#loading').hide();
		        inputElement.value = "";
            	return;
		    }
         if(manualMode) {
            
            const chatContentElement = document.getElementById("chat-content");

	        const userMessageElement = document.createElement("div");
	        userMessageElement.classList.add("line");
	        const userChatBoxElement = document.createElement("span");
	        userChatBoxElement.classList.add("chat-box");
	        userChatBoxElement.textContent = message;
	        userMessageElement.appendChild(userChatBoxElement);
	        chatContentElement.appendChild(userMessageElement);
	        console.log(genre);
	        
	        if (message.charAt(message.length - 1) === '원') {//평점순
	        	price=message;
			  	$('#grid-container').empty()
				$.ajax({
			        url: '/priceSelection',
			        type: 'post',
			        data: {
			            grade: grade,
			            genre: genre,
			            price: message
			        },
			        dataType: 'json',
			        beforeSend: function() {
			            
			        },
			        success: function(data) {
						addAssistantMessage("맞춤 도서를 추천해드릴게요");
						console.log(data);
			        	appendBoxesToGrid(data);
						var chatContent = document.getElementById('chat-content');
    					chatContent.scrollTop = chatContent.scrollHeight;

    					
			        }
			    })
				inputElement.value = "";
				$('#loading').hide();
				
				return
			}
	        
	        
	        if (message.charAt(message.length - 1) === '점') {//평점순
	        	grade=message;
			  	$('#grid-container').empty()
				$.ajax({
			        url: '/gradeSelection',
			        type: 'post',
			        data: {
			            grade: message,
			            genre: genre
			        },
			        dataType: 'json',
			        beforeSend: function() {
			            
			        },
			        success: function(data) {
						addAssistantMessage("얼마 이하 가격을 원하시나요?(ex:15000)");
						console.log(data);
			        	appendBoxesToGrid(data);
						var chatContent = document.getElementById('chat-content');
    					chatContent.scrollTop = chatContent.scrollHeight;
			
			        }
			    })
				inputElement.value = "";
				$('#loading').hide();
				
				return
			}
			//장르별
            if(message==="판타지"||message==="로맨스"||message==="공포/스릴러/추리"||message==="드라마"||message==="코미디"){
				genre=message;
				$('#grid-container').empty()
				$.ajax({
			        url: '/genreSelection',
			        type: 'post',
			        data: {
			            genre: message
			        },
			        dataType: 'json',
			        beforeSend: function() {
			            
			        },
			        success: function(data) {
						addAssistantMessage("몇 점 이상을 원하시나요?(ex:5점)");
						console.log(data);
			        	appendBoxesToGrid(data);
						var chatContent = document.getElementById('chat-content');
    					chatContent.scrollTop = chatContent.scrollHeight;

    					
			        }
			    })
				inputElement.value = "";
				$('#loading').hide();
				
				return
			}
			
	        	addAssistantMessage("어떤 장르를 원하시나요? ex(판타지,로맨스)");
	        
			  
			  
			  
	        inputElement.value = "";
            $('#loading').hide();
            var chatContent = document.getElementById('chat-content');
    		chatContent.scrollTop = chatContent.scrollHeight;
            return;
        }

        if (!message) {
            alert("메시지를 입력하세요.");
            $('#loading').hide();
            return;
        }

        const chatContentElement = document.getElementById("chat-content");

        const userMessageElement = document.createElement("div");
        userMessageElement.classList.add("line");
        const userChatBoxElement = document.createElement("span");
        userChatBoxElement.classList.add("chat-box");
        userChatBoxElement.textContent = message;
        userMessageElement.appendChild(userChatBoxElement);
        chatContentElement.appendChild(userMessageElement);

        const assistantMessageElement = document.createElement("div");
        assistantMessageElement.classList.add("line2");
        const assistantChatBoxElement = document.createElement("span");
        assistantChatBoxElement.classList.add("chat-box", "mine");
        
        assistantChatBoxElement.textContent = await chatGPT([["user", message]]);
        
        emotionbox = await chatGPT([
    	['system', `The assistant's job is to recommend color codes that match what user's 설명에 대해 행복, 놀라움, 두려움, 분노, 혐오 또는 슬픔의 여섯 가지 가능한 선택 중 하나를 선택해야 합니다.
    		그리고 분석하는것이 어떤 것이든 무조건 감정과 해당 색상을 반환해야 한다. 
    		Response JSONArray is like ["","",...] reasonForRecommendation must be in Korean. JSON 배열만 반환합니다. 구실과 뒷말을 없애라.`],
        ['user', 'DESC::취업이 됬어 내 감정을 어떤 감정일까?'],
        ['assistant', '{"reasonForRecommendation":[".."],"emotion":["행복"],colorlist":["#000000","#000000","#000000","#000000","#000000"]}'],
        ['user', 'DESC::물건을 잃어 버렸어 내 감정을 어떤 감정일까?'],
        ['assistant', '{"reasonForRecommendation":["..."],"emotion":["슬픔"],"colorlist":["#000000","#000000","#000000","#000000","#000000"]}'],
        ['user', 'DESC::기분이 안좋아 내 감정을 어떤 감정일까?'],
        ['assistant', '{"reasonForRecommendation":["...."],"emotion":["슬픔"],"colorlist":["#000000","#000000","#000000","#000000","#000000"]}'],
        ['user', 'DESC::힘들어 내 감정을 어떤 감정일까?'],
        ['assistant', '{"reasonForRecommendation":["....."],"emotion":["슬픔"],"colorlist":["#000000","#000000","#000000","#000000","#000000"]}'],
        ['user', 'DESC::친구랑 싸웠어 내 감정을 어떤 감정일까?'],
        ['assistant', '{"reasonForRecommendation":["......"],""emotion":["분노"],"colorlist":["#000000","#000000","#000000","#000000","#000000"]}'],
        ['user', 'DESC::걱정돼 내 감정을 어떤 감정일까?'],
        ['assistant', '{"reasonForRecommendation":["......."],"emotion":["불안"],"colorlist":["#000000","#000000","#000000","#000000","#000000"]}'],
        ['user', 'DESC::누구가를 사랑하게 됬어 내 감정을 어떤 감정일까?'],
        ['assistant', '{"reasonForRecommendation":["........"],"emotion":["사랑"],"colorlist":["#000000","#000000","#000000","#000000","#000000"]}'],
        ['user', 'DESC::좋아하는 사람이 생겼어 내 감정을 어떤 감정일까?'],
        ['assistant', '{"reasonForRecommendation":["........."],"emotion":["사랑"],"colorlist":["#000000","#000000","#000000","#000000","#000000"]}'],
        ['user', 'DESC::좋아하는, 관심, 사랑'],
        ['assistant', '{"reasonForRecommendation":[".........."],"emotion":["사랑"],"colorlist":["#000000","#000000","#000000","#000000","#000000"]}'],
        ['user', 'DESC::좋은일이 생겼어 내 감정을 어떤 감정일까?'],
        ['assistant', '{"reasonForRecommendation":["..........."],"emotion":["행복"],"colorlist":["#000000","#000000","#000000","#000000","#000000"]}'],
        ['user', message+" 내 감정을 어떤 감정일까?의 색깔과 감정과 추천 이유"],
    ], { temperature: 0.8 });
        
        assistantMessageElement.appendChild(assistantChatBoxElement);
			chatContentElement.appendChild(assistantMessageElement);
         try {
			  console.log(emotionbox);
			  const emotion = JSON.parse(emotionbox);
			  alert(emotion.reasonForRecommendation);
			  console.log(emotion.emotion);
			  const heading = document.querySelector('h2');
			  heading.textContent = emotion.emotion;
			  const heading2 = document.querySelector('p');
			  heading2.textContent = emotion.reasonForRecommendation;
			  for (let i = 0; i < emotion.colorlist.length; i++) {
			  const color = emotion.colorlist[i];
			
			  // .color-item 요소들을 선택합니다.
			  const colorItems = document.querySelectorAll('.color-item');
			
			  // 현재 색상에 해당하는 .color-item 요소가 있는지 확인합니다.
			  if (colorItems[i]) {
			    // 현재 .color-item 요소의 배경색을 업데이트합니다.
			    colorItems[i].style.backgroundColor = color;
			  }
			}
			  suggestion(emotion.emotion);//도서 호출
			  const assistantMessageElement2 = document.createElement("div");
			  assistantMessageElement2.classList.add("line2");
			  const assistantChatBoxElement2 = document.createElement("span");
			  assistantChatBoxElement2.classList.add("chat-box", "mine");
			  assistantChatBoxElement2.textContent = "기분에 도움이 될만한 책을 추천 해드릴게요";
			  assistantMessageElement2.appendChild(assistantChatBoxElement2);
			  chatContentElement.appendChild(assistantMessageElement2);
			  $('#loading').hide();
			  clickModalButton();
			 
			} catch (error) {
			  const assistantMessageElement2 = document.createElement("div");
			  assistantMessageElement2.classList.add("line2");
			  const assistantChatBoxElement2 = document.createElement("span");
			  assistantChatBoxElement2.classList.add("chat-box", "mine");
			  assistantChatBoxElement2.textContent = "죄송하지만 감정을 분석할 수 없어서 베스트 셀러로 추천해드리겠습니다.";
			  assistantMessageElement2.appendChild(assistantChatBoxElement2);
			  chatContentElement.appendChild(assistantMessageElement2);
			  assistantMessageElement.appendChild(assistantChatBoxElement);
			  chatContentElement.appendChild(assistantMessageElement);
			  $('#loading').hide();
			  clickModalButton();
			  
			}
			
			
        
        inputElement.value = "";
        var chatContent = document.getElementById('chat-content');
    	chatContent.scrollTop = chatContent.scrollHeight;
    }
    // 채팅 반복요소
    function addAssistantMessage(text) {
		const chatContentElement = document.getElementById("chat-content");

	        const userMessageElement = document.createElement("div");
	        userMessageElement.classList.add("line");
	        
	        
	  		const assistantMessageElement = document.createElement("div");
	        assistantMessageElement.classList.add("line2");
	        const assistantChatBoxElement = document.createElement("span");
	        assistantChatBoxElement.classList.add("chat-box", "mine");
	        
	        const assistantMessageElement2 = document.createElement("div");
			assistantMessageElement2.classList.add("line2");
			 const assistantChatBoxElement2 = document.createElement("span");
			  assistantChatBoxElement2.classList.add("chat-box", "mine");
			  assistantChatBoxElement2.textContent = text;
			  assistantMessageElement2.appendChild(assistantChatBoxElement2);
			  
			  const assistantMessageElement3 = document.createElement("div");
			  assistantMessageElement3.classList.add("line2");
			  const assistantChatBoxElement3 = document.createElement("span");
			  assistantChatBoxElement3.classList.add("chat-box", "mine");
			  assistantChatBoxElement3.textContent = '▼ 수동모드취소 ▼   "수동추천모드취소"';
			  assistantMessageElement3.appendChild(assistantChatBoxElement3);
			  
			  
			  chatContentElement.appendChild(assistantMessageElement2);
			  chatContentElement.appendChild(assistantMessageElement3);
	}
	// 채팅 박스 요소
	
	
	
    

    const sendButton = document.getElementById("send");
    sendButton.addEventListener("click", sendMessage);

    const inputElement = document.getElementById("input");
    inputElement.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            sendMessage();
        }
    });
})

