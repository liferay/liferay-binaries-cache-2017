import Utils from "./utils";
import Lexer from "./lexer";
export declare namespace ArrayOrObject {
    function complexColInUri(value: Utils.SourceArray, index: number): Lexer.Token;
    function complexInUri(value: Utils.SourceArray, index: number): Lexer.Token;
    function collectionPropertyInUri(value: Utils.SourceArray, index: number): Lexer.Token;
    function primitiveColInUri(value: Utils.SourceArray, index: number): Lexer.Token;
    function complexPropertyInUri(value: Utils.SourceArray, index: number): Lexer.Token;
    function annotationInUri(value: Utils.SourceArray, index: number): Lexer.Token;
    function keyValuePairInUri(value: Utils.SourceArray, index: number, keyFn: Function, valueFn: Function): Lexer.Token;
    function primitivePropertyInUri(value: Utils.SourceArray, index: number): Lexer.Token;
    function navigationPropertyInUri(value: Utils.SourceArray, index: number): Lexer.Token;
    function singleNavPropInJSON(value: Utils.SourceArray, index: number): Lexer.Token;
    function collectionNavPropInJSON(value: Utils.SourceArray, index: number): Lexer.Token;
    function rootExprCol(value: Utils.SourceArray, index: number): Lexer.Token;
    function primitiveLiteralInJSON(value: Utils.SourceArray, index: number): Lexer.Token;
    function stringInJSON(value: Utils.SourceArray, index: number): Lexer.Token;
    function charInJSON(value: Utils.SourceArray, index: number): number;
    function numberInJSON(value: Utils.SourceArray, index: number): Lexer.Token;
    function booleanInJSON(value: Utils.SourceArray, index: number): Lexer.Token;
    function nullInJSON(value: Utils.SourceArray, index: number): Lexer.Token;
    function arrayOrObject(value: Utils.SourceArray, index: number): Lexer.Token;
}
export default ArrayOrObject;
