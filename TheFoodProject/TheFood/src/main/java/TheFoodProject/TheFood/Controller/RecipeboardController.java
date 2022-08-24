//package TheFoodProject.TheFood.Controller;
//
//import TheFoodProject.TheFood.entity.Recipeboard;
//import TheFoodProject.TheFood.service.RecipeboardService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.Authentication;
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.multipart.MultipartFile;
//
//
//@Controller
//public class RecipeboardController {
//    @Autowired
//    private RecipeboardService recipeboardService;
//
//
//
//    @GetMapping("/recipe/write")
//    public String boardWriteForm(){
//        return "recipeboardwrite";
//    }
//
//    @PostMapping("/recipe/writepro")
//    public String boardWritePro(Recipeboard recipeboard, MultipartFile file, Authentication authentication) throws Exception{
//
//        String username = authentication.getName();
//        recipeboardService.write(username, recipeboard, file);
//
//        return "redirect:/recipe/list";
//    }
//
//
//    @GetMapping("/recipe/list")
//    public String boardList(Model model){
//        model.addAttribute("list", recipeboardService.boardList());
//        return "recipeboardlist";
//    }
//
//    @GetMapping("/recipe/list/category")
//    public String boardList1(Model model, Integer recipecategory){
//        model.addAttribute("list", recipeboardService.boardList1(recipecategory));
//        return "recipeboardlist";}
//
//
//    @GetMapping("/recipe/view") // localhost:8080/board/view?id=1
//    public String boardView(Model model, Integer id){
//
//        model.addAttribute("recipeboard", recipeboardService.boardView(id));
//        return "recipeboardview";
//    }
//
//    @GetMapping("/recipe/delete")
//    public String boardDelete(Integer id){
//
//        recipeboardService.boardDelete(id);
//
//        return "redirect:/recipe/list";
//    }
//
//
//    @GetMapping("/recipe/modify/{id}")
//    public String boardModify(@PathVariable("id") Integer id, Model model) {
//
//        model.addAttribute("board", recipeboardService.boardView(id));
//
//        return "recipeboardmodify";
//    }
//
//    @PostMapping("/recipe/update/{id}")
//    public String boardUpdate(@PathVariable("id") Integer id, Recipeboard recipeboard, MultipartFile file) throws Exception{
//
////        Board boardTemp = boardService.boardView(id);
////        boardTemp.setTitle(board.getTitle());
////        boardTemp.setContent(board.getContent());
////
////        boardService.write(boardTemp, file);
//
//        return "redirect:/recipe/list";
//    }
//}
