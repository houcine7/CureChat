package com.chatCure.backend.Services.Users;

import com.chatCure.backend.Entities.UserEntity;
import com.chatCure.backend.Models.UserDetailsImp;
import com.chatCure.backend.Repositories.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class UserDetailsImpService implements UserDetailsService {

    @Autowired
    UserRepository userRepository ;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity user =userRepository.findByUsername(username).
                orElseThrow(()-> new UsernameNotFoundException("No user name with username:"+username));

        UserDetailsImp userDetailsImp =new UserDetailsImp() ;

        BeanUtils.copyProperties(user,userDetailsImp);

        return userDetailsImp;
    }


    public UserDetails loadUserById(String id){
        UserEntity user =userRepository.findById(id).
                orElseThrow(()-> new UsernameNotFoundException("No user name with id:"+id));

        UserDetailsImp userDetailsImp =new UserDetailsImp() ;

        BeanUtils.copyProperties(user,userDetailsImp);

        return userDetailsImp;

    }
}
