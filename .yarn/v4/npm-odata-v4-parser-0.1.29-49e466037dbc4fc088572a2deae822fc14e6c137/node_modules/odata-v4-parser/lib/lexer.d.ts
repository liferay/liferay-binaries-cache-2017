import Utils from "./utils";
export declare enum TokenType {
    Literal = "Literal",
    ArrayOrObject = "ArrayOrObject",
    Array = "Array",
    Object = "Object",
    Property = "Property",
    Annotation = "Annotation",
    Enum = "Enum",
    EnumValue = "EnumValue",
    EnumMemberValue = "EnumMemberValue",
    Identifier = "Identifier",
    QualifiedEntityTypeName = "QualifiedEntityTypeName",
    QualifiedComplexTypeName = "QualifiedComplexTypeName",
    ODataIdentifier = "ODataIdentifier",
    Collection = "Collection",
    NamespacePart = "NamespacePart",
    EntitySetName = "EntitySetName",
    SingletonEntity = "SingletonEntity",
    EntityTypeName = "EntityTypeName",
    ComplexTypeName = "ComplexTypeName",
    TypeDefinitionName = "TypeDefinitionName",
    EnumerationTypeName = "EnumerationTypeName",
    EnumerationMember = "EnumerationMember",
    TermName = "TermName",
    PrimitiveProperty = "PrimitiveProperty",
    PrimitiveKeyProperty = "PrimitiveKeyProperty",
    PrimitiveNonKeyProperty = "PrimitiveNonKeyProperty",
    PrimitiveCollectionProperty = "PrimitiveCollectionProperty",
    ComplexProperty = "ComplexProperty",
    ComplexCollectionProperty = "ComplexCollectionProperty",
    StreamProperty = "StreamProperty",
    NavigationProperty = "NavigationProperty",
    EntityNavigationProperty = "EntityNavigationProperty",
    EntityCollectionNavigationProperty = "EntityCollectionNavigationProperty",
    Action = "Action",
    ActionImport = "ActionImport",
    Function = "Function",
    EntityFunction = "EntityFunction",
    EntityCollectionFunction = "EntityCollectionFunction",
    ComplexFunction = "ComplexFunction",
    ComplexCollectionFunction = "ComplexCollectionFunction",
    PrimitiveFunction = "PrimitiveFunction",
    PrimitiveCollectionFunction = "PrimitiveCollectionFunction",
    EntityFunctionImport = "EntityFunctionImport",
    EntityCollectionFunctionImport = "EntityCollectionFunctionImport",
    ComplexFunctionImport = "ComplexFunctionImport",
    ComplexCollectionFunctionImport = "ComplexCollectionFunctionImport",
    PrimitiveFunctionImport = "PrimitiveFunctionImport",
    PrimitiveCollectionFunctionImport = "PrimitiveCollectionFunctionImport",
    CommonExpression = "CommonExpression",
    AndExpression = "AndExpression",
    OrExpression = "OrExpression",
    EqualsExpression = "EqualsExpression",
    NotEqualsExpression = "NotEqualsExpression",
    LesserThanExpression = "LesserThanExpression",
    LesserOrEqualsExpression = "LesserOrEqualsExpression",
    GreaterThanExpression = "GreaterThanExpression",
    GreaterOrEqualsExpression = "GreaterOrEqualsExpression",
    HasExpression = "HasExpression",
    AddExpression = "AddExpression",
    SubExpression = "SubExpression",
    MulExpression = "MulExpression",
    DivExpression = "DivExpression",
    ModExpression = "ModExpression",
    NotExpression = "NotExpression",
    BoolParenExpression = "BoolParenExpression",
    ParenExpression = "ParenExpression",
    MethodCallExpression = "MethodCallExpression",
    IsOfExpression = "IsOfExpression",
    CastExpression = "CastExpression",
    NegateExpression = "NegateExpression",
    FirstMemberExpression = "FirstMemberExpression",
    MemberExpression = "MemberExpression",
    PropertyPathExpression = "PropertyPathExpression",
    ImplicitVariableExpression = "ImplicitVariableExpression",
    LambdaVariable = "LambdaVariable",
    LambdaVariableExpression = "LambdaVariableExpression",
    LambdaPredicateExpression = "LambdaPredicateExpression",
    AnyExpression = "AnyExpression",
    AllExpression = "AllExpression",
    CollectionNavigationExpression = "CollectionNavigationExpression",
    SimpleKey = "SimpleKey",
    CompoundKey = "CompoundKey",
    KeyValuePair = "KeyValuePair",
    KeyPropertyValue = "KeyPropertyValue",
    KeyPropertyAlias = "KeyPropertyAlias",
    SingleNavigationExpression = "SingleNavigationExpression",
    CollectionPathExpression = "CollectionPathExpression",
    ComplexPathExpression = "ComplexPathExpression",
    SinglePathExpression = "SinglePathExpression",
    FunctionExpression = "FunctionExpression",
    FunctionExpressionParameters = "FunctionExpressionParameters",
    FunctionExpressionParameter = "FunctionExpressionParameter",
    ParameterName = "ParameterName",
    ParameterAlias = "ParameterAlias",
    ParameterValue = "ParameterValue",
    CountExpression = "CountExpression",
    RefExpression = "RefExpression",
    ValueExpression = "ValueExpression",
    RootExpression = "RootExpression",
    QueryOptions = "QueryOptions",
    CustomQueryOption = "CustomQueryOption",
    Expand = "Expand",
    ExpandItem = "ExpandItem",
    ExpandPath = "ExpandPath",
    ExpandCountOption = "ExpandCountOption",
    ExpandRefOption = "ExpandRefOption",
    ExpandOption = "ExpandOption",
    Levels = "Levels",
    Search = "Search",
    SearchExpression = "SearchExpression",
    SearchParenExpression = "SearchParenExpression",
    SearchNotExpression = "SearchNotExpression",
    SearchOrExpression = "SearchOrExpression",
    SearchAndExpression = "SearchAndExpression",
    SearchTerm = "SearchTerm",
    SearchPhrase = "SearchPhrase",
    SearchWord = "SearchWord",
    Filter = "Filter",
    OrderBy = "OrderBy",
    OrderByItem = "OrderByItem",
    Skip = "Skip",
    Top = "Top",
    Format = "Format",
    InlineCount = "InlineCount",
    Select = "Select",
    SelectItem = "SelectItem",
    SelectPath = "SelectPath",
    AliasAndValue = "AliasAndValue",
    SkipToken = "SkipToken",
    Id = "Id",
    Crossjoin = "Crossjoin",
    AllResource = "AllResource",
    ActionImportCall = "ActionImportCall",
    FunctionImportCall = "FunctionImportCall",
    EntityCollectionFunctionImportCall = "EntityCollectionFunctionImportCall",
    EntityFunctionImportCall = "EntityFunctionImportCall",
    ComplexCollectionFunctionImportCall = "ComplexCollectionFunctionImportCall",
    ComplexFunctionImportCall = "ComplexFunctionImportCall",
    PrimitiveCollectionFunctionImportCall = "PrimitiveCollectionFunctionImportCall",
    PrimitiveFunctionImportCall = "PrimitiveFunctionImportCall",
    FunctionParameters = "FunctionParameters",
    FunctionParameter = "FunctionParameter",
    ResourcePath = "ResourcePath",
    CollectionNavigation = "CollectionNavigation",
    CollectionNavigationPath = "CollectionNavigationPath",
    SingleNavigation = "SingleNavigation",
    PropertyPath = "PropertyPath",
    ComplexPath = "ComplexPath",
    BoundOperation = "BoundOperation",
    BoundActionCall = "BoundActionCall",
    BoundEntityFunctionCall = "BoundEntityFunctionCall",
    BoundEntityCollectionFunctionCall = "BoundEntityCollectionFunctionCall",
    BoundComplexFunctionCall = "BoundComplexFunctionCall",
    BoundComplexCollectionFunctionCall = "BoundComplexCollectionFunctionCall",
    BoundPrimitiveFunctionCall = "BoundPrimitiveFunctionCall",
    BoundPrimitiveCollectionFunctionCall = "BoundPrimitiveCollectionFunctionCall",
    ODataUri = "ODataUri",
    Batch = "Batch",
    Entity = "Entity",
    Metadata = "Metadata",
}
export declare const LexerTokenType: typeof TokenType;
export declare type LexerTokenType = TokenType;
export declare class Token {
    position: number;
    next: number;
    value: any;
    type: TokenType;
    raw: string;
    metadata: any;
    constructor(token: any);
}
export declare const LexerToken: typeof Token;
export declare type LexerToken = Token;
export declare namespace Lexer {
    type Token = LexerToken;
    const Token: typeof LexerToken;
    type TokenType = LexerTokenType;
    const TokenType: typeof LexerTokenType;
    function tokenize(value: Utils.SourceArray, index: number, next: number, tokenValue: any, tokenType: TokenType, metadataContextContainer?: Token): Token;
    function clone(token: any): Token;
    function ALPHA(value: number): boolean;
    function DIGIT(value: number): boolean;
    function HEXDIG(value: number): boolean;
    function AtoF(value: number): boolean;
    function DQUOTE(value: number): boolean;
    function SP(value: number): boolean;
    function HTAB(value: number): boolean;
    function VCHAR(value: number): boolean;
    function whitespaceLength(value: any, index: any): 3 | 1;
    function OWS(value: Utils.SourceArray, index: number): number;
    function RWS(value: Utils.SourceArray, index: number): number;
    function BWS(value: Utils.SourceArray, index: number): number;
    function AT(value: Utils.SourceArray, index: number): number;
    function COLON(value: Utils.SourceArray, index: number): number;
    function COMMA(value: Utils.SourceArray, index: number): number;
    function EQ(value: Utils.SourceArray, index: number): number;
    function SIGN(value: Utils.SourceArray, index: number): number;
    function SEMI(value: Utils.SourceArray, index: number): number;
    function STAR(value: Utils.SourceArray, index: number): number;
    function SQUOTE(value: Utils.SourceArray, index: number): number;
    function OPEN(value: Utils.SourceArray, index: number): number;
    function CLOSE(value: Utils.SourceArray, index: number): number;
    function unreserved(value: number): boolean;
    function otherDelims(value: Utils.SourceArray, index: number): number;
    function subDelims(value: Utils.SourceArray, index: number): number;
    function pctEncoded(value: Utils.SourceArray, index: number): number;
    function pctEncodedNoSQUOTE(value: Utils.SourceArray, index: number): number;
    function pctEncodedUnescaped(value: Utils.SourceArray, index: number): number;
    function pchar(value: Utils.SourceArray, index: number): number;
    function pcharNoSQUOTE(value: Utils.SourceArray, index: number): number;
    function qcharNoAMP(value: Utils.SourceArray, index: number): number;
    function qcharNoAMPDQUOTE(value: Utils.SourceArray, index: number): number;
    function base64char(value: number): boolean;
    function base64b16(value: Utils.SourceArray, index: number): number;
    function base64b8(value: Utils.SourceArray, index: number): number;
    function nanInfinity(value: Utils.SourceArray, index: number): number;
    function oneToNine(value: number): boolean;
    function zeroToFiftyNine(value: Utils.SourceArray, index: number): number;
    function year(value: Utils.SourceArray, index: number): number;
    function month(value: Utils.SourceArray, index: number): number;
    function day(value: Utils.SourceArray, index: number): number;
    function hour(value: Utils.SourceArray, index: number): number;
    function minute(value: Utils.SourceArray, index: number): number;
    function second(value: Utils.SourceArray, index: number): number;
    function fractionalSeconds(value: Utils.SourceArray, index: number): number;
    function geographyPrefix(value: Utils.SourceArray, index: number): number;
    function geometryPrefix(value: Utils.SourceArray, index: number): number;
    function identifierLeadingCharacter(value: number): boolean;
    function identifierCharacter(value: number): boolean;
    function beginObject(value: Utils.SourceArray, index: number): number;
    function endObject(value: Utils.SourceArray, index: number): number;
    function beginArray(value: Utils.SourceArray, index: number): number;
    function endArray(value: Utils.SourceArray, index: number): number;
    function quotationMark(value: Utils.SourceArray, index: number): number;
    function nameSeparator(value: Utils.SourceArray, index: number): number;
    function valueSeparator(value: Utils.SourceArray, index: number): number;
    function escape(value: Utils.SourceArray, index: number): number;
}
export default Lexer;
