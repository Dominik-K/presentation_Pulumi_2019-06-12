import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";

export class gkeCluster {
    kubeconfig: pulumi.Output<string>;
    clusterName: string;

    constructor(name: string) {
        const cluster = new gcp.container.Cluster(name, {
            initialNodeCount: 2,
            minMasterVersion: "latest",
            nodeVersion: "latest",
            nodeConfig: {
                machineType: "n1-standard-1",
                oauthScopes: [
                    "https://www.googleapis.com/auth/compute",
                    "https://www.googleapis.com/auth/devstorage.read_only",
                    "https://www.googleapis.com/auth/logging.write",
                    "https://www.googleapis.com/auth/monitoring"
                ],
            },
        });

        // Export the Cluster name
        // this.clusterName = cluster.name;

        // Manufacture a GKE-style kubeconfig. Note that this is slightly "different"
        // because of the way GKE requires gcloud to be in the picture for cluster
        // authentication (rather than using the client cert/key directly).
        this.kubeconfig = pulumi.all([cluster.name, cluster.endpoint, cluster.masterAuth]).apply(([name, endpoint, masterAuth]) => {
                const context = `${gcp.config.project}_${gcp.config.zone}_${name}`;
                return `apiVersion: v1
    clusters:
    - cluster:
        certificate-authority-data: ${masterAuth.clusterCaCertificate}
        server: https://${endpoint}
      name: ${context}
    contexts:
    - context:
        cluster: ${context}
        user: ${context}
      name: ${context}
    current-context: ${context}
    kind: Config
    preferences: {}
    users:
    - name: ${context}
      user:
        auth-provider:
          config:
            cmd-args: config config-helper --format=json
            cmd-path: gcloud
            expiry-key: '{.credential.token_expiry}'
            token-key: '{.credential.access_token}'
          name: gcp
    `;
            });
    }
}
