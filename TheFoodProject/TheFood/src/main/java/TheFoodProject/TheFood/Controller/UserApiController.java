//package TheFoodProject.TheFood.Controller;
//
//import TheFoodProject.TheFood.entity.Board;
//import TheFoodProject.TheFood.entity.User;
//import TheFoodProject.TheFood.repository.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api")
//
//public class UserApiController {
//    @Autowired
//    private UserRepository repository;
//
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
//}