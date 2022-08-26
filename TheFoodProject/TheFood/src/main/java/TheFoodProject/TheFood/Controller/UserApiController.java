package TheFoodProject.TheFood.Controller;

import TheFoodProject.TheFood.DTO.UserRequestDto;
import TheFoodProject.TheFood.repository.UserRepository;
import TheFoodProject.TheFood.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")

public class UserApiController {
    @Autowired
    private UserRepository repository;

    @Autowired
    private UserService userService;

    private final AuthenticationManager authenticationManager;

    public UserApiController(UserRepository repository, UserService userService, AuthenticationManager authenticationManager) {
        this.repository = repository;
        this.userService = userService;
        this.authenticationManager = authenticationManager;
    }


    @PutMapping("/user")
    public ResponseEntity<String> modify(@RequestBody UserRequestDto dto) {
        userService.modify(dto);

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(dto.getUsername(), dto.getUserpassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);


        return new ResponseEntity<>("success", HttpStatus.OK);
    }



//    @PutMapping("/user")
//    public UserRepository<Integer> modify(@RequestBody User user){
//        userService.usermodify(user);
//        // 세션 등록
//        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getUserpassword());
//        SecurityContextHolder.getContext().setAuthentication(authentication);
//        return UserRepository<Integer> (HttpStatus.OK.value(), 1);
//    }

//    @GetMapping("/users")
//    List<User> all() {
//        return repository.findAll();
//    }
//
//    @PostMapping("/users")
//    User newUser(@RequestBody User newUser) {
//        return repository.save(newUser);
//    }
//
//    // Single item
//
//    @GetMapping("/users/{id}")
//    User one(@PathVariable Integer id) {
//        return repository.findById(id).orElse(null);
//    }
//
//    @PutMapping("/users/{id}")
//    User replaceUser(@RequestBody User newUser, @PathVariable Integer id) {
//
//        return repository.findById(id)
//                .map(user -> {
////                    user.setTitle(newUser.getTitle());
////                    user.setContent(newUser.getContent());
////                    user.setBoards(newUser.getBoards());
//                    user.getBoards().clear();
//                    user.getBoards().addAll(newUser.getBoards());
//                    for(Board board : user.getBoards()) {
//                        board.setUser(user);
//                    }
//                    return repository.save(user);
//                })
//                .orElseGet(() -> {
//                    newUser.setId(id);
//                    return repository.save(newUser);
//                });
//    }
//
//    @DeleteMapping("/users/{id}")
//    void deleteUser(@PathVariable Integer id) {
//        repository.deleteById(id);
//    }
}