//package TheFoodProject.TheFood.service;
//
//import TheFoodProject.TheFood.entity.User;
//import TheFoodProject.TheFood.repository.UserRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//import java.nio.file.attribute.UserPrincipal;
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Optional;
//
//@RequiredArgsConstructor
//@Service
//
//public class UserSecurityService implements UserDetailsService {
//    private final UserRepository userRepository;
//
//    @Override
//    public UserDetails loadUserByUsername(String userid) throws UsernameNotFoundException {
//        Optional<User> _User = this.userRepository.findByuserid(userid);
//        if (_User.isEmpty()) {
//            throw new UsernameNotFoundException("사용자를 찾을수 없습니다.");
//        }
//        User user1 = _User.get();
////        List<GrantedAuthority> authorities = new ArrayList<>();
////        if ("admin".equals(username)) {
////            authorities.add(new SimpleGrantedAuthority(UserRole.ADMIN.getValue()));
////        } else {
////            authorities.add(new SimpleGrantedAuthority(UserRole.USER.getValue()));
////        }
////        return new User(User.getUserid(), User.getuserPassword(), authorities);
//        return new User(user1.getUserid(), user1.getUserpassword());
//    }
//}
