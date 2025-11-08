'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">petshop-api documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                                <li class="link">
                                    <a href="overview.html" data-type="chapter-link">
                                        <span class="icon ion-ios-keypad"></span>Overview
                                    </a>
                                </li>

                            <li class="link">
                                <a href="index.html" data-type="chapter-link">
                                    <span class="icon ion-ios-paper"></span>
                                        README
                                </a>
                            </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>

                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AdministradorModule.html" data-type="entity-link" >AdministradorModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AdministradorModule-c36c4ea1da813770b5b9743944699ba3a5e2f76de6d8be07cde6aa34c9df5bd4c35de1050ec3ea9e153a8a85a2879c660289c5234bd62da0d07d759dfdcf3863"' : 'data-bs-target="#xs-controllers-links-module-AdministradorModule-c36c4ea1da813770b5b9743944699ba3a5e2f76de6d8be07cde6aa34c9df5bd4c35de1050ec3ea9e153a8a85a2879c660289c5234bd62da0d07d759dfdcf3863"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AdministradorModule-c36c4ea1da813770b5b9743944699ba3a5e2f76de6d8be07cde6aa34c9df5bd4c35de1050ec3ea9e153a8a85a2879c660289c5234bd62da0d07d759dfdcf3863"' :
                                            'id="xs-controllers-links-module-AdministradorModule-c36c4ea1da813770b5b9743944699ba3a5e2f76de6d8be07cde6aa34c9df5bd4c35de1050ec3ea9e153a8a85a2879c660289c5234bd62da0d07d759dfdcf3863"' }>
                                            <li class="link">
                                                <a href="controllers/AdministradorController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdministradorController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AdministradorModule-c36c4ea1da813770b5b9743944699ba3a5e2f76de6d8be07cde6aa34c9df5bd4c35de1050ec3ea9e153a8a85a2879c660289c5234bd62da0d07d759dfdcf3863"' : 'data-bs-target="#xs-injectables-links-module-AdministradorModule-c36c4ea1da813770b5b9743944699ba3a5e2f76de6d8be07cde6aa34c9df5bd4c35de1050ec3ea9e153a8a85a2879c660289c5234bd62da0d07d759dfdcf3863"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AdministradorModule-c36c4ea1da813770b5b9743944699ba3a5e2f76de6d8be07cde6aa34c9df5bd4c35de1050ec3ea9e153a8a85a2879c660289c5234bd62da0d07d759dfdcf3863"' :
                                        'id="xs-injectables-links-module-AdministradorModule-c36c4ea1da813770b5b9743944699ba3a5e2f76de6d8be07cde6aa34c9df5bd4c35de1050ec3ea9e153a8a85a2879c660289c5234bd62da0d07d759dfdcf3863"' }>
                                        <li class="link">
                                            <a href="injectables/AdministradorService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdministradorService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-4842e16e083426fe0ec0a738d4e3c399b8bc1583a9138297fd958ae214d83642a35d4495f34f926ae36f74a0ebca887add6f35c36dd6c7ef5f8c693489ac8dcd"' : 'data-bs-target="#xs-controllers-links-module-AppModule-4842e16e083426fe0ec0a738d4e3c399b8bc1583a9138297fd958ae214d83642a35d4495f34f926ae36f74a0ebca887add6f35c36dd6c7ef5f8c693489ac8dcd"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-4842e16e083426fe0ec0a738d4e3c399b8bc1583a9138297fd958ae214d83642a35d4495f34f926ae36f74a0ebca887add6f35c36dd6c7ef5f8c693489ac8dcd"' :
                                            'id="xs-controllers-links-module-AppModule-4842e16e083426fe0ec0a738d4e3c399b8bc1583a9138297fd958ae214d83642a35d4495f34f926ae36f74a0ebca887add6f35c36dd6c7ef5f8c693489ac8dcd"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-4842e16e083426fe0ec0a738d4e3c399b8bc1583a9138297fd958ae214d83642a35d4495f34f926ae36f74a0ebca887add6f35c36dd6c7ef5f8c693489ac8dcd"' : 'data-bs-target="#xs-injectables-links-module-AppModule-4842e16e083426fe0ec0a738d4e3c399b8bc1583a9138297fd958ae214d83642a35d4495f34f926ae36f74a0ebca887add6f35c36dd6c7ef5f8c693489ac8dcd"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-4842e16e083426fe0ec0a738d4e3c399b8bc1583a9138297fd958ae214d83642a35d4495f34f926ae36f74a0ebca887add6f35c36dd6c7ef5f8c693489ac8dcd"' :
                                        'id="xs-injectables-links-module-AppModule-4842e16e083426fe0ec0a738d4e3c399b8bc1583a9138297fd958ae214d83642a35d4495f34f926ae36f74a0ebca887add6f35c36dd6c7ef5f8c693489ac8dcd"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-4a62fb8345fa548620d2e21e00153a91e44ee9f98c5a16a9befc93346549170f536e85c20a25d10ea49cdb7096c9ebcc4011841a8db0e85547cf687fa1b4cbe7"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-4a62fb8345fa548620d2e21e00153a91e44ee9f98c5a16a9befc93346549170f536e85c20a25d10ea49cdb7096c9ebcc4011841a8db0e85547cf687fa1b4cbe7"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-4a62fb8345fa548620d2e21e00153a91e44ee9f98c5a16a9befc93346549170f536e85c20a25d10ea49cdb7096c9ebcc4011841a8db0e85547cf687fa1b4cbe7"' :
                                            'id="xs-controllers-links-module-AuthModule-4a62fb8345fa548620d2e21e00153a91e44ee9f98c5a16a9befc93346549170f536e85c20a25d10ea49cdb7096c9ebcc4011841a8db0e85547cf687fa1b4cbe7"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-4a62fb8345fa548620d2e21e00153a91e44ee9f98c5a16a9befc93346549170f536e85c20a25d10ea49cdb7096c9ebcc4011841a8db0e85547cf687fa1b4cbe7"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-4a62fb8345fa548620d2e21e00153a91e44ee9f98c5a16a9befc93346549170f536e85c20a25d10ea49cdb7096c9ebcc4011841a8db0e85547cf687fa1b4cbe7"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-4a62fb8345fa548620d2e21e00153a91e44ee9f98c5a16a9befc93346549170f536e85c20a25d10ea49cdb7096c9ebcc4011841a8db0e85547cf687fa1b4cbe7"' :
                                        'id="xs-injectables-links-module-AuthModule-4a62fb8345fa548620d2e21e00153a91e44ee9f98c5a16a9befc93346549170f536e85c20a25d10ea49cdb7096c9ebcc4011841a8db0e85547cf687fa1b4cbe7"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ClienteModule.html" data-type="entity-link" >ClienteModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ClienteModule-c42c640c5ee14b7c293907e9fde4d464d950519affb12e1558703d3ead492c0fb58b7e15fb01d359658a2f4312ff4a08de4656ee5e267275cdde4c96efde3000"' : 'data-bs-target="#xs-controllers-links-module-ClienteModule-c42c640c5ee14b7c293907e9fde4d464d950519affb12e1558703d3ead492c0fb58b7e15fb01d359658a2f4312ff4a08de4656ee5e267275cdde4c96efde3000"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ClienteModule-c42c640c5ee14b7c293907e9fde4d464d950519affb12e1558703d3ead492c0fb58b7e15fb01d359658a2f4312ff4a08de4656ee5e267275cdde4c96efde3000"' :
                                            'id="xs-controllers-links-module-ClienteModule-c42c640c5ee14b7c293907e9fde4d464d950519affb12e1558703d3ead492c0fb58b7e15fb01d359658a2f4312ff4a08de4656ee5e267275cdde4c96efde3000"' }>
                                            <li class="link">
                                                <a href="controllers/ClienteController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ClienteController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ClienteModule-c42c640c5ee14b7c293907e9fde4d464d950519affb12e1558703d3ead492c0fb58b7e15fb01d359658a2f4312ff4a08de4656ee5e267275cdde4c96efde3000"' : 'data-bs-target="#xs-injectables-links-module-ClienteModule-c42c640c5ee14b7c293907e9fde4d464d950519affb12e1558703d3ead492c0fb58b7e15fb01d359658a2f4312ff4a08de4656ee5e267275cdde4c96efde3000"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ClienteModule-c42c640c5ee14b7c293907e9fde4d464d950519affb12e1558703d3ead492c0fb58b7e15fb01d359658a2f4312ff4a08de4656ee5e267275cdde4c96efde3000"' :
                                        'id="xs-injectables-links-module-ClienteModule-c42c640c5ee14b7c293907e9fde4d464d950519affb12e1558703d3ead492c0fb58b7e15fb01d359658a2f4312ff4a08de4656ee5e267275cdde4c96efde3000"' }>
                                        <li class="link">
                                            <a href="injectables/ClienteService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ClienteService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DetalleFacturaModule.html" data-type="entity-link" >DetalleFacturaModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-DetalleFacturaModule-2390b7bb89eeb98e86915104f6eaf7a602ca3f1775c8909d824c755eabbfa0962c11d412e0058173bcc1cbfb40a8434e871fe515d3fe70b29d20841c8257fdd9"' : 'data-bs-target="#xs-controllers-links-module-DetalleFacturaModule-2390b7bb89eeb98e86915104f6eaf7a602ca3f1775c8909d824c755eabbfa0962c11d412e0058173bcc1cbfb40a8434e871fe515d3fe70b29d20841c8257fdd9"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-DetalleFacturaModule-2390b7bb89eeb98e86915104f6eaf7a602ca3f1775c8909d824c755eabbfa0962c11d412e0058173bcc1cbfb40a8434e871fe515d3fe70b29d20841c8257fdd9"' :
                                            'id="xs-controllers-links-module-DetalleFacturaModule-2390b7bb89eeb98e86915104f6eaf7a602ca3f1775c8909d824c755eabbfa0962c11d412e0058173bcc1cbfb40a8434e871fe515d3fe70b29d20841c8257fdd9"' }>
                                            <li class="link">
                                                <a href="controllers/DetalleFacturaController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DetalleFacturaController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-DetalleFacturaModule-2390b7bb89eeb98e86915104f6eaf7a602ca3f1775c8909d824c755eabbfa0962c11d412e0058173bcc1cbfb40a8434e871fe515d3fe70b29d20841c8257fdd9"' : 'data-bs-target="#xs-injectables-links-module-DetalleFacturaModule-2390b7bb89eeb98e86915104f6eaf7a602ca3f1775c8909d824c755eabbfa0962c11d412e0058173bcc1cbfb40a8434e871fe515d3fe70b29d20841c8257fdd9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DetalleFacturaModule-2390b7bb89eeb98e86915104f6eaf7a602ca3f1775c8909d824c755eabbfa0962c11d412e0058173bcc1cbfb40a8434e871fe515d3fe70b29d20841c8257fdd9"' :
                                        'id="xs-injectables-links-module-DetalleFacturaModule-2390b7bb89eeb98e86915104f6eaf7a602ca3f1775c8909d824c755eabbfa0962c11d412e0058173bcc1cbfb40a8434e871fe515d3fe70b29d20841c8257fdd9"' }>
                                        <li class="link">
                                            <a href="injectables/DetalleFacturaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DetalleFacturaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/EmpleadoModule.html" data-type="entity-link" >EmpleadoModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-EmpleadoModule-508c650e76a6950a850b18e6c953ccc86e9347fed4a7d9a84b4cb139d5e4a2fac811e502cce8cf9b904435ca46ab919e3d104fab25b90243a3b7fbe349894d12"' : 'data-bs-target="#xs-controllers-links-module-EmpleadoModule-508c650e76a6950a850b18e6c953ccc86e9347fed4a7d9a84b4cb139d5e4a2fac811e502cce8cf9b904435ca46ab919e3d104fab25b90243a3b7fbe349894d12"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-EmpleadoModule-508c650e76a6950a850b18e6c953ccc86e9347fed4a7d9a84b4cb139d5e4a2fac811e502cce8cf9b904435ca46ab919e3d104fab25b90243a3b7fbe349894d12"' :
                                            'id="xs-controllers-links-module-EmpleadoModule-508c650e76a6950a850b18e6c953ccc86e9347fed4a7d9a84b4cb139d5e4a2fac811e502cce8cf9b904435ca46ab919e3d104fab25b90243a3b7fbe349894d12"' }>
                                            <li class="link">
                                                <a href="controllers/EmpleadoController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmpleadoController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-EmpleadoModule-508c650e76a6950a850b18e6c953ccc86e9347fed4a7d9a84b4cb139d5e4a2fac811e502cce8cf9b904435ca46ab919e3d104fab25b90243a3b7fbe349894d12"' : 'data-bs-target="#xs-injectables-links-module-EmpleadoModule-508c650e76a6950a850b18e6c953ccc86e9347fed4a7d9a84b4cb139d5e4a2fac811e502cce8cf9b904435ca46ab919e3d104fab25b90243a3b7fbe349894d12"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-EmpleadoModule-508c650e76a6950a850b18e6c953ccc86e9347fed4a7d9a84b4cb139d5e4a2fac811e502cce8cf9b904435ca46ab919e3d104fab25b90243a3b7fbe349894d12"' :
                                        'id="xs-injectables-links-module-EmpleadoModule-508c650e76a6950a850b18e6c953ccc86e9347fed4a7d9a84b4cb139d5e4a2fac811e502cce8cf9b904435ca46ab919e3d104fab25b90243a3b7fbe349894d12"' }>
                                        <li class="link">
                                            <a href="injectables/EmpleadoService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmpleadoService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/InventarioModule.html" data-type="entity-link" >InventarioModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-InventarioModule-62531aa30da9921d2b430272617fad2288d27f2e12a18244fe967422552f431792b8658bb6812ed95661a91db1008fef26026509cb5e272d9a842265be3850ab"' : 'data-bs-target="#xs-controllers-links-module-InventarioModule-62531aa30da9921d2b430272617fad2288d27f2e12a18244fe967422552f431792b8658bb6812ed95661a91db1008fef26026509cb5e272d9a842265be3850ab"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-InventarioModule-62531aa30da9921d2b430272617fad2288d27f2e12a18244fe967422552f431792b8658bb6812ed95661a91db1008fef26026509cb5e272d9a842265be3850ab"' :
                                            'id="xs-controllers-links-module-InventarioModule-62531aa30da9921d2b430272617fad2288d27f2e12a18244fe967422552f431792b8658bb6812ed95661a91db1008fef26026509cb5e272d9a842265be3850ab"' }>
                                            <li class="link">
                                                <a href="controllers/InventarioController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InventarioController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-InventarioModule-62531aa30da9921d2b430272617fad2288d27f2e12a18244fe967422552f431792b8658bb6812ed95661a91db1008fef26026509cb5e272d9a842265be3850ab"' : 'data-bs-target="#xs-injectables-links-module-InventarioModule-62531aa30da9921d2b430272617fad2288d27f2e12a18244fe967422552f431792b8658bb6812ed95661a91db1008fef26026509cb5e272d9a842265be3850ab"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-InventarioModule-62531aa30da9921d2b430272617fad2288d27f2e12a18244fe967422552f431792b8658bb6812ed95661a91db1008fef26026509cb5e272d9a842265be3850ab"' :
                                        'id="xs-injectables-links-module-InventarioModule-62531aa30da9921d2b430272617fad2288d27f2e12a18244fe967422552f431792b8658bb6812ed95661a91db1008fef26026509cb5e272d9a842265be3850ab"' }>
                                        <li class="link">
                                            <a href="injectables/InventarioService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InventarioService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MascotaModule.html" data-type="entity-link" >MascotaModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-MascotaModule-47905546c8cfb1d374020dbaaf5c12bac8f57ac26e8f7b0f43ab57aa07a262231881606dd7d086446f2b5707ad6b998d056ff76391006705e3cc2577dead1315"' : 'data-bs-target="#xs-controllers-links-module-MascotaModule-47905546c8cfb1d374020dbaaf5c12bac8f57ac26e8f7b0f43ab57aa07a262231881606dd7d086446f2b5707ad6b998d056ff76391006705e3cc2577dead1315"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MascotaModule-47905546c8cfb1d374020dbaaf5c12bac8f57ac26e8f7b0f43ab57aa07a262231881606dd7d086446f2b5707ad6b998d056ff76391006705e3cc2577dead1315"' :
                                            'id="xs-controllers-links-module-MascotaModule-47905546c8cfb1d374020dbaaf5c12bac8f57ac26e8f7b0f43ab57aa07a262231881606dd7d086446f2b5707ad6b998d056ff76391006705e3cc2577dead1315"' }>
                                            <li class="link">
                                                <a href="controllers/MascotaController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MascotaController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MascotaModule-47905546c8cfb1d374020dbaaf5c12bac8f57ac26e8f7b0f43ab57aa07a262231881606dd7d086446f2b5707ad6b998d056ff76391006705e3cc2577dead1315"' : 'data-bs-target="#xs-injectables-links-module-MascotaModule-47905546c8cfb1d374020dbaaf5c12bac8f57ac26e8f7b0f43ab57aa07a262231881606dd7d086446f2b5707ad6b998d056ff76391006705e3cc2577dead1315"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MascotaModule-47905546c8cfb1d374020dbaaf5c12bac8f57ac26e8f7b0f43ab57aa07a262231881606dd7d086446f2b5707ad6b998d056ff76391006705e3cc2577dead1315"' :
                                        'id="xs-injectables-links-module-MascotaModule-47905546c8cfb1d374020dbaaf5c12bac8f57ac26e8f7b0f43ab57aa07a262231881606dd7d086446f2b5707ad6b998d056ff76391006705e3cc2577dead1315"' }>
                                        <li class="link">
                                            <a href="injectables/MascotaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MascotaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProductoModule.html" data-type="entity-link" >ProductoModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ProductoModule-5eeac4a76b663fe401a11ac7f4b51662ccd1b77070e16c903165719b25239734128469ebe2e70895c047dd0d103d9a658da227a41cf11d3dd58a5c2f68ff155c"' : 'data-bs-target="#xs-controllers-links-module-ProductoModule-5eeac4a76b663fe401a11ac7f4b51662ccd1b77070e16c903165719b25239734128469ebe2e70895c047dd0d103d9a658da227a41cf11d3dd58a5c2f68ff155c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProductoModule-5eeac4a76b663fe401a11ac7f4b51662ccd1b77070e16c903165719b25239734128469ebe2e70895c047dd0d103d9a658da227a41cf11d3dd58a5c2f68ff155c"' :
                                            'id="xs-controllers-links-module-ProductoModule-5eeac4a76b663fe401a11ac7f4b51662ccd1b77070e16c903165719b25239734128469ebe2e70895c047dd0d103d9a658da227a41cf11d3dd58a5c2f68ff155c"' }>
                                            <li class="link">
                                                <a href="controllers/ProductoController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductoController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ProductoModule-5eeac4a76b663fe401a11ac7f4b51662ccd1b77070e16c903165719b25239734128469ebe2e70895c047dd0d103d9a658da227a41cf11d3dd58a5c2f68ff155c"' : 'data-bs-target="#xs-injectables-links-module-ProductoModule-5eeac4a76b663fe401a11ac7f4b51662ccd1b77070e16c903165719b25239734128469ebe2e70895c047dd0d103d9a658da227a41cf11d3dd58a5c2f68ff155c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProductoModule-5eeac4a76b663fe401a11ac7f4b51662ccd1b77070e16c903165719b25239734128469ebe2e70895c047dd0d103d9a658da227a41cf11d3dd58a5c2f68ff155c"' :
                                        'id="xs-injectables-links-module-ProductoModule-5eeac4a76b663fe401a11ac7f4b51662ccd1b77070e16c903165719b25239734128469ebe2e70895c047dd0d103d9a658da227a41cf11d3dd58a5c2f68ff155c"' }>
                                        <li class="link">
                                            <a href="injectables/ProductoService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductoService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProveedorModule.html" data-type="entity-link" >ProveedorModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ProveedorModule-43d65dd076e0a173fdae5148a0ac2179d6875e3672f155a47836ce44606936facaf49843bd5d4f54b40c0d1983ed16a49e431a885b5796daaeb8ef6a811571cb"' : 'data-bs-target="#xs-controllers-links-module-ProveedorModule-43d65dd076e0a173fdae5148a0ac2179d6875e3672f155a47836ce44606936facaf49843bd5d4f54b40c0d1983ed16a49e431a885b5796daaeb8ef6a811571cb"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProveedorModule-43d65dd076e0a173fdae5148a0ac2179d6875e3672f155a47836ce44606936facaf49843bd5d4f54b40c0d1983ed16a49e431a885b5796daaeb8ef6a811571cb"' :
                                            'id="xs-controllers-links-module-ProveedorModule-43d65dd076e0a173fdae5148a0ac2179d6875e3672f155a47836ce44606936facaf49843bd5d4f54b40c0d1983ed16a49e431a885b5796daaeb8ef6a811571cb"' }>
                                            <li class="link">
                                                <a href="controllers/ProveedorController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProveedorController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ProveedorModule-43d65dd076e0a173fdae5148a0ac2179d6875e3672f155a47836ce44606936facaf49843bd5d4f54b40c0d1983ed16a49e431a885b5796daaeb8ef6a811571cb"' : 'data-bs-target="#xs-injectables-links-module-ProveedorModule-43d65dd076e0a173fdae5148a0ac2179d6875e3672f155a47836ce44606936facaf49843bd5d4f54b40c0d1983ed16a49e431a885b5796daaeb8ef6a811571cb"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProveedorModule-43d65dd076e0a173fdae5148a0ac2179d6875e3672f155a47836ce44606936facaf49843bd5d4f54b40c0d1983ed16a49e431a885b5796daaeb8ef6a811571cb"' :
                                        'id="xs-injectables-links-module-ProveedorModule-43d65dd076e0a173fdae5148a0ac2179d6875e3672f155a47836ce44606936facaf49843bd5d4f54b40c0d1983ed16a49e431a885b5796daaeb8ef6a811571cb"' }>
                                        <li class="link">
                                            <a href="injectables/ProveedorService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProveedorService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TemplatePlaygroundModule.html" data-type="entity-link" >TemplatePlaygroundModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' : 'data-bs-target="#xs-components-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' :
                                            'id="xs-components-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' }>
                                            <li class="link">
                                                <a href="components/TemplatePlaygroundComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TemplatePlaygroundComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' : 'data-bs-target="#xs-injectables-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' :
                                        'id="xs-injectables-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' }>
                                        <li class="link">
                                            <a href="injectables/HbsRenderService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HbsRenderService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TemplateEditorService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TemplateEditorService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ZipExportService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ZipExportService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TiendaModule.html" data-type="entity-link" >TiendaModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-TiendaModule-a5bdf50ddfdc1749def24870d7e2769e25421c13e678cafb27b64175f99c5fce464639e1bdaa3bf17c4e95f20cac2e834b89509945f86959c63bbb786410d76f"' : 'data-bs-target="#xs-controllers-links-module-TiendaModule-a5bdf50ddfdc1749def24870d7e2769e25421c13e678cafb27b64175f99c5fce464639e1bdaa3bf17c4e95f20cac2e834b89509945f86959c63bbb786410d76f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TiendaModule-a5bdf50ddfdc1749def24870d7e2769e25421c13e678cafb27b64175f99c5fce464639e1bdaa3bf17c4e95f20cac2e834b89509945f86959c63bbb786410d76f"' :
                                            'id="xs-controllers-links-module-TiendaModule-a5bdf50ddfdc1749def24870d7e2769e25421c13e678cafb27b64175f99c5fce464639e1bdaa3bf17c4e95f20cac2e834b89509945f86959c63bbb786410d76f"' }>
                                            <li class="link">
                                                <a href="controllers/TiendaController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TiendaController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TiendaModule-a5bdf50ddfdc1749def24870d7e2769e25421c13e678cafb27b64175f99c5fce464639e1bdaa3bf17c4e95f20cac2e834b89509945f86959c63bbb786410d76f"' : 'data-bs-target="#xs-injectables-links-module-TiendaModule-a5bdf50ddfdc1749def24870d7e2769e25421c13e678cafb27b64175f99c5fce464639e1bdaa3bf17c4e95f20cac2e834b89509945f86959c63bbb786410d76f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TiendaModule-a5bdf50ddfdc1749def24870d7e2769e25421c13e678cafb27b64175f99c5fce464639e1bdaa3bf17c4e95f20cac2e834b89509945f86959c63bbb786410d76f"' :
                                        'id="xs-injectables-links-module-TiendaModule-a5bdf50ddfdc1749def24870d7e2769e25421c13e678cafb27b64175f99c5fce464639e1bdaa3bf17c4e95f20cac2e834b89509945f86959c63bbb786410d76f"' }>
                                        <li class="link">
                                            <a href="injectables/TiendaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TiendaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/VentaModule.html" data-type="entity-link" >VentaModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-VentaModule-ca92a946c09e3a9729f807a49a56dc2433533d6249f2ee13e33e595b077066002c2623a3ffabb7081efe8ab2c4f63250302193c5910778bf6b91e701ba9670dc"' : 'data-bs-target="#xs-controllers-links-module-VentaModule-ca92a946c09e3a9729f807a49a56dc2433533d6249f2ee13e33e595b077066002c2623a3ffabb7081efe8ab2c4f63250302193c5910778bf6b91e701ba9670dc"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-VentaModule-ca92a946c09e3a9729f807a49a56dc2433533d6249f2ee13e33e595b077066002c2623a3ffabb7081efe8ab2c4f63250302193c5910778bf6b91e701ba9670dc"' :
                                            'id="xs-controllers-links-module-VentaModule-ca92a946c09e3a9729f807a49a56dc2433533d6249f2ee13e33e595b077066002c2623a3ffabb7081efe8ab2c4f63250302193c5910778bf6b91e701ba9670dc"' }>
                                            <li class="link">
                                                <a href="controllers/VentaController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VentaController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-VentaModule-ca92a946c09e3a9729f807a49a56dc2433533d6249f2ee13e33e595b077066002c2623a3ffabb7081efe8ab2c4f63250302193c5910778bf6b91e701ba9670dc"' : 'data-bs-target="#xs-injectables-links-module-VentaModule-ca92a946c09e3a9729f807a49a56dc2433533d6249f2ee13e33e595b077066002c2623a3ffabb7081efe8ab2c4f63250302193c5910778bf6b91e701ba9670dc"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-VentaModule-ca92a946c09e3a9729f807a49a56dc2433533d6249f2ee13e33e595b077066002c2623a3ffabb7081efe8ab2c4f63250302193c5910778bf6b91e701ba9670dc"' :
                                        'id="xs-injectables-links-module-VentaModule-ca92a946c09e3a9729f807a49a56dc2433533d6249f2ee13e33e595b077066002c2623a3ffabb7081efe8ab2c4f63250302193c5910778bf6b91e701ba9670dc"' }>
                                        <li class="link">
                                            <a href="injectables/VentaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VentaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AdministradorController.html" data-type="entity-link" >AdministradorController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ClienteController.html" data-type="entity-link" >ClienteController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/DetalleFacturaController.html" data-type="entity-link" >DetalleFacturaController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/EmpleadoController.html" data-type="entity-link" >EmpleadoController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/InventarioController.html" data-type="entity-link" >InventarioController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/MascotaController.html" data-type="entity-link" >MascotaController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ProductoController.html" data-type="entity-link" >ProductoController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ProveedorController.html" data-type="entity-link" >ProveedorController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/TiendaController.html" data-type="entity-link" >TiendaController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/VentaController.html" data-type="entity-link" >VentaController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Administrador.html" data-type="entity-link" >Administrador</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Cliente.html" data-type="entity-link" >Cliente</a>
                                </li>
                                <li class="link">
                                    <a href="entities/DetalleFactura.html" data-type="entity-link" >DetalleFactura</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Empleado.html" data-type="entity-link" >Empleado</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Inventario.html" data-type="entity-link" >Inventario</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Mascota.html" data-type="entity-link" >Mascota</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Producto.html" data-type="entity-link" >Producto</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Proveedor.html" data-type="entity-link" >Proveedor</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Tienda.html" data-type="entity-link" >Tienda</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Venta.html" data-type="entity-link" >Venta</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreateAdministradorDto.html" data-type="entity-link" >CreateAdministradorDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateClienteDto.html" data-type="entity-link" >CreateClienteDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateDetalleFacturaDto.html" data-type="entity-link" >CreateDetalleFacturaDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateEmpleadoDto.html" data-type="entity-link" >CreateEmpleadoDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateInventarioDto.html" data-type="entity-link" >CreateInventarioDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateMascotaDto.html" data-type="entity-link" >CreateMascotaDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateProductoDto.html" data-type="entity-link" >CreateProductoDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateProveedorDto.html" data-type="entity-link" >CreateProveedorDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTiendaDto.html" data-type="entity-link" >CreateTiendaDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateVentaDto.html" data-type="entity-link" >CreateVentaDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginAdminDto.html" data-type="entity-link" >LoginAdminDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginDto.html" data-type="entity-link" >LoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginEmpleadoDto.html" data-type="entity-link" >LoginEmpleadoDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterDto.html" data-type="entity-link" >RegisterDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateAdministradorDto.html" data-type="entity-link" >UpdateAdministradorDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateClienteDto.html" data-type="entity-link" >UpdateClienteDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateDetalleFacturaDto.html" data-type="entity-link" >UpdateDetalleFacturaDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateEmpleadoDto.html" data-type="entity-link" >UpdateEmpleadoDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateInventarioDto.html" data-type="entity-link" >UpdateInventarioDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateMascotaDto.html" data-type="entity-link" >UpdateMascotaDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateProductoDto.html" data-type="entity-link" >UpdateProductoDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateProveedorDto.html" data-type="entity-link" >UpdateProveedorDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateTiendaDto.html" data-type="entity-link" >UpdateTiendaDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateVentaDto.html" data-type="entity-link" >UpdateVentaDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AdministradorService.html" data-type="entity-link" >AdministradorService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ClienteService.html" data-type="entity-link" >ClienteService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DetalleFacturaService.html" data-type="entity-link" >DetalleFacturaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EmpleadoService.html" data-type="entity-link" >EmpleadoService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HbsRenderService.html" data-type="entity-link" >HbsRenderService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/InventarioService.html" data-type="entity-link" >InventarioService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MascotaService.html" data-type="entity-link" >MascotaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProductoService.html" data-type="entity-link" >ProductoService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProveedorService.html" data-type="entity-link" >ProveedorService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TemplateEditorService.html" data-type="entity-link" >TemplateEditorService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TiendaService.html" data-type="entity-link" >TiendaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/VentaService.html" data-type="entity-link" >VentaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ZipExportService.html" data-type="entity-link" >ZipExportService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/RolesGuard.html" data-type="entity-link" >RolesGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/CompoDocConfig.html" data-type="entity-link" >CompoDocConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Session.html" data-type="entity-link" >Session</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Template.html" data-type="entity-link" >Template</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});