package com.chatCure.backend.Services.authentication;

import com.chatCure.backend.Controllers.Requests.LoginReq;
import com.chatCure.backend.Controllers.Requests.RegisterReq;
import com.chatCure.backend.Controllers.Responses.AuthenticationRes;

public interface AuthenticationService {

    AuthenticationRes login(LoginReq req) ;
    AuthenticationRes register(RegisterReq req);

}
